/**
 * Cpu and server clustering shared store class
 */
global.SHARED_STORE = SHARED_STORE = CLASS(function(cls) {
	'use strict';

	var
	// static storage
	storage = {},

	// remove delays
	removeDelays = {},

	// save.
	save,

	// get.
	get,

	// remove.
	remove;

	cls.save = save = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.fullName
		//REQUIRED: params.value
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: params.isWaitRemove
		//OPTIONAL: remove

		var
		// full name
		fullName = params.fullName,

		// value
		value = params.value,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,

		// is wait remove
		isWaitRemove = params.isWaitRemove;

		storage[fullName] = value;

		if (isWaitRemove === true && removeDelays[fullName] !== undefined) {
			removeDelays[fullName].remove();
			delete removeDelays[fullName];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[fullName] = DELAY(removeAfterSeconds, remove);
		}
	};

	cls.get = get = function(fullName) {
		//REQUIRED: fullName

		return storage[fullName];
	};

	cls.remove = remove = function(fullName) {
		//REQUIRED: fullName

		delete storage[fullName];

		if (removeDelays[fullName] !== undefined) {
			removeDelays[fullName].remove();
			delete removeDelays[fullName];
		}
	};

	return {

		init : function(inner, self, name) {
			'use strict';
			//REQUIRED: name

			var
			// gen full name.
			genFullName,

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			genFullName = function(_name) {
				return name + '.' + _name;
			};

			self.save = save = function(params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.value
				//OPTIONAL: params.removeAfterSeconds

				var
				// name
				name = params.name,

				// full name
				fullName = genFullName(name),

				// value
				value = params.value,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.save({
					fullName : fullName,
					value : value,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(name);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_SAVE',
						data : {
							fullName : fullName,
							value : value,
							isWaitRemove : removeAfterSeconds !== undefined
						}
					});
				}

				if (SERVER_CLUSTERING.broadcast !== undefined) {

					SERVER_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_SAVE',
						data : {
							fullName : fullName,
							value : value,
							isWaitRemove : removeAfterSeconds !== undefined
						}
					});
				}
			};

			self.get = get = function(name) {
				//REQUIRED: name

				return cls.get(genFullName(name));
			};

			self.remove = remove = function(name) {
				//REQUIRED: name

				var
				// full name
				fullName = genFullName(name);

				cls.remove(fullName);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : fullName
					});
				}

				if (SERVER_CLUSTERING.broadcast !== undefined) {

					SERVER_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : fullName
					});
				}
			};
		}
	};
});
