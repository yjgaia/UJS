/**
 * Cpu clustering shared store class
 */
global.CPU_SHARED_STORE = CPU_SHARED_STORE = CLASS(function(cls) {
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
			//REQUIRED: name

			var
			// gen full name.
			getFullName,

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			inner.getFullName = getFullName = function(_name) {
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
				fullName = getFullName(name),

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
						methodName : '__CPU_SHARED_STORE_SAVE',
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

				return cls.get(getFullName(name));
			};

			self.remove = remove = function(name) {
				//REQUIRED: name

				var
				// full name
				fullName = getFullName(name);

				cls.remove(fullName);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_STORE_REMOVE',
						data : fullName
					});
				}
			};
		}
	};
});
