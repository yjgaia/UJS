/**
 * CPU clustering shared db class
 */
global.CPU_SHARED_DB = CLASS(function(cls) {
	'use strict';

	var
	// storages
	storages = {},

	// remove delay map
	removeDelayMap = {},

	// create.
	create,
	
	// update.
	update,

	// get.
	get,
	
	// list.
	list,

	// remove.
	remove;

	cls.create = create = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,

		// data
		data = params.data,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,
		
		// storage
		storage = storages[dbName],
		
		// remove delays
		removeDelays = removeDelayMap[dbName];
		
		if (storage === undefined) {
			storage = storages[dbName] = {};
		}

		storage[id] = data;
		
		if (removeDelays === undefined) {
			removeDelays = removeDelayMap[dbName] = {};
		}

		if (removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[id] = DELAY(removeAfterSeconds, remove);
		}
	};
	
	cls.update = update = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		//REQUIRED: params.data
		//OPTIONAL: params.data.$inc
		//OPTIONAL: params.data.$push
		//OPTIONAL: params.data.$addToSet
		//OPTIONAL: params.data.$pull
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,

		// data
		data = params.data,
		
		// $inc
		$inc = data.$inc,
		
		// $push
		$push = data.$push,
		
		// $addToSet
		$addToSet = data.$addToSet,
		
		// $pull
		$pull = data.$pull,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,
		
		// storage
		storage = storages[dbName],
		
		// remove delays
		removeDelays = removeDelayMap[dbName],
		
		// saved data
		savedData;
		
		if (storage === undefined) {
			storage = storages[dbName] = {};
		}
		
		delete data.$inc;
		delete data.$push;
		delete data.$addToSet;
		delete data.$pull;
		
		savedData = storage[id];
		savedData = storage[id] = savedData === undefined ? COPY(data) : COMBINE([savedData, data]);
		
		if ($inc !== undefined) {
			EACH($inc, function(value, name) {
				savedData[name] += value;
			});
		}
		
		if ($push !== undefined) {
			EACH($push, function(value, name) {
				if (CHECK_IS_ARRAY(savedData[name]) === true) {
					savedData[name].push(value);
				}
			});
		}
		
		if ($addToSet !== undefined) {
			EACH($addToSet, function(value, name) {
				if (CHECK_IS_ARRAY(savedData[name]) === true && CHECK_IS_IN({
					array : savedData[name],
					value : value
				}) !== true) {
					savedData[name].push(value);
				}
			});
		}
		
		if ($pull !== undefined) {
			EACH($pull, function(value, name) {
				if (CHECK_IS_ARRAY(savedData[name]) === true) {
					REMOVE({
						array : savedData[name],
						value : value
					});
				}
			});
		}
		
		if (removeDelays === undefined) {
			removeDelays = removeDelayMap[dbName] = {};
		}

		if (removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[id] = DELAY(removeAfterSeconds, remove);
		}
	};

	cls.get = get = function(params) {
		//REQUIRED: params
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		
		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[dbName];
		
		if (storage !== undefined) {
			return storage[id];
		}
	};
	
	cls.list = list = function(dbName) {
		//REQUIRED: dbName
		
		var
		// storage
		storage = storages[dbName];
		
		return storage === undefined ? {} : storage;
	};

	cls.remove = remove = function(params) {
		//REQUIRED: params
		//REQUIRED: params.dbName
		//REQUIRED: params.id
		
		var
		// db name
		dbName = params.dbName,
		
		// id
		id = params.id,
		
		// storage
		storage = storages[dbName],
		
		// remove delays
		removeDelays = removeDelayMap[dbName];
		
		if (storage !== undefined) {
			delete storage[id];
		}

		if (removeDelays !== undefined && removeDelays[id] !== undefined) {
			removeDelays[id].remove();
			delete removeDelays[id];
		}
	};

	return {

		init : function(inner, self, dbName) {
			//REQUIRED: dbName

			var
			// create.
			create,
			
			// update.
			update,
			
			// list.
			list,

			// remove.
			remove;

			self.create = create = function(params) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.removeAfterSeconds

				var
				// id
				id = params.id,

				// data
				data = params.data,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.create({
					dbName : dbName,
					id : id,
					data : data,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(id);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_CREATE',
						data : {
							dbName : dbName,
							id : id,
							data : data
						}
					});
				}
			};
			
			self.update = update = function(params) {
				//REQUIRED: params
				//REQUIRED: params.id
				//REQUIRED: params.data
				//OPTIONAL: params.data.$inc
				//OPTIONAL: params.data.$push
				//OPTIONAL: params.data.$addToSet
				//OPTIONAL: params.data.$pull
				//OPTIONAL: params.removeAfterSeconds

				var
				// id
				id = params.id,

				// data
				data = params.data,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.update({
					dbName : dbName,
					id : id,
					data : data,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(id);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_UPDATE',
						data : {
							dbName : dbName,
							id : id,
							data : data
						}
					});
				}
			};

			self.get = get = function(id) {
				//REQUIRED: id

				return cls.get({
					dbName : dbName,
					id : id
				});
			};
			
			self.list = list = function() {
				return cls.list(dbName);
			};

			self.remove = remove = function(id) {
				//REQUIRED: id

				cls.remove({
					dbName : dbName,
					id : id
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_DB_REMOVE',
						data : {
							dbName : dbName,
							id : id
						}
					});
				}
			};
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.CPU_SHARED_DB = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// shared db
			sharedDB = CPU_SHARED_DB(box.boxName + '.' + name),

			// create.
			create,
			
			// update.
			update,

			// get.
			get,
			
			// list.
			list,

			// remove.
			remove;

			self.create = create = sharedDB.create;

			self.update = update = sharedDB.update;

			self.get = get = sharedDB.get;
			
			self.list = list = sharedDB.list;

			self.remove = remove = sharedDB.remove;
		}
	});
});
