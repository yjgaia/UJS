/**
 * Browser store class
 */
global.STORE = STORE = CLASS({

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

		inner.genFullKey = genFullKey = function(key) {
			//REQUIRED: key

			return name + '.' + key;
		};

		self.save = save = function(params) {
			//REQUIRED: params
			//REQUIRED: params.key
			//REQUIRED: params.value
			//OPTIONAL: params.isToSession

			var
			// key
			key = params.key,

			// full key
			fullKey = genFullKey(key),

			// value
			value = params.value,

			// is to session
			isToSession = params.isToSession;

			sessionStorage.setItem(fullKey, STRINGIFY(value));

			if (isToSession !== true) {
				localStorage.setItem(fullKey, STRINGIFY(value));
			}
		};

		self.get = get = function(key) {
			//REQUIRED: key

			var
			// full key
			fullKey = genFullKey(key),

			// value
			value = PARSE_STR(sessionStorage.getItem(fullKey));

			if (value === undefined || value === TO_DELETE) {
				value = PARSE_STR(localStorage.getItem(fullKey));

				if (value === TO_DELETE) {
					value = undefined;
				}
			}

			return value;
		};

		self.remove = remove = function(key) {
			//REQUIRED: key

			var
			// full key
			fullKey = genFullKey(key);

			sessionStorage.removeItem(fullKey);
			localStorage.removeItem(fullKey);
		};
	}
});
