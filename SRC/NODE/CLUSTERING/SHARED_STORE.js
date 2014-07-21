/**
 * Cpu and server clustering shared store class
 */
global.SHARED_STORE = SHARED_STORE = CLASS(function(cls) {'use strict';

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
		//REQUIRED: params.fullKey
		//REQUIRED: params.value
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: params.isWaitRemove
		//OPTIONAL: remove

		var
		// full key
		fullKey = params.fullKey,

		// value
		value = params.value,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,

		// is wait remove
		isWaitRemove = params.isWaitRemove;

		storage[fullKey] = value;

		if (isWaitRemove === true && removeDelays[fullKey] !== undefined) {
			removeDelays[fullKey].remove();
			delete removeDelays[fullKey];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[fullKey] = DELAY(removeAfterSeconds, remove);
		}
	};

	cls.get = get = function(fullKey) {
		//REQUIRED: fullKey

		return storage[fullKey];
	};

	cls.remove = remove = function(fullKey) {
		//REQUIRED: fullKey

		delete storage[fullKey];

		if (removeDelays[fullKey] !== undefined) {
			removeDelays[fullKey].remove();
			delete removeDelays[fullKey];
		}
	};

	return {

		init : function(inner, self, name) {'use strict';
			//REQUIRED: name

			var
			// gen full key.
			genFullKey,

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			genFullKey = function(key) {
				return name + '.' + key;
			};

			self.save = save = function(params) {
				//REQUIRED: params
				//REQUIRED: params.key
				//REQUIRED: params.value
				//OPTIONAL: params.removeAfterSeconds

				var
				// key
				key = params.key,

				// full key
				fullKey = genFullKey(key),

				// value
				value = params.value,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.save({
					fullKey : fullKey,
					value : value,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(key);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_SAVE',
						data : {
							fullKey : fullKey,
							value : value,
							isWaitRemove : removeAfterSeconds !== undefined
						}
					});
				}

				if (SERVER_CLUSTERING.broadcast !== undefined) {

					SERVER_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_SAVE',
						data : {
							fullKey : fullKey,
							value : value,
							isWaitRemove : removeAfterSeconds !== undefined
						}
					});
				}
			};

			self.get = get = function(key) {
				//REQUIRED: key

				return cls.get(genFullKey(key));
			};

			self.remove = remove = function(key) {
				//REQUIRED: key

				var
				// full key
				fullKey = genFullKey(key);

				cls.remove(fullKey);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : fullKey
					});
				}

				if (SERVER_CLUSTERING.broadcast !== undefined) {

					SERVER_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : fullKey
					});
				}
			};
		}
	};
});
