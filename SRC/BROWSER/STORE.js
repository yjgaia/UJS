/**
 * Browser store class
 */
global.STORE = CLASS({

	init : function(inner, self, storeName) {
		'use strict';
		//REQUIRED: storeName

		var
		// gen full name.
		genFullName,

		// save.
		save,

		// get.
		get,

		// remove.
		remove;

		inner.genFullName = genFullName = function(name) {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		self.save = save = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value
			//OPTIONAL: params.isToSession

			var
			// name
			name = params.name,

			// full name
			fullName = genFullName(name),

			// value
			value = params.value,

			// is to session
			isToSession = params.isToSession;

			sessionStorage.setItem(fullName, STRINGIFY(value));

			if (isToSession !== true) {
				localStorage.setItem(fullName, STRINGIFY(value));
			}
		};

		self.get = get = function(name) {
			//REQUIRED: name

			var
			// full name
			fullName = genFullName(name),

			// value
			value = PARSE_STR(sessionStorage.getItem(fullName));

			if (value === undefined || value === TO_DELETE) {
				value = PARSE_STR(localStorage.getItem(fullName));

				if (value === TO_DELETE) {
					value = undefined;
				}
			}

			return value;
		};

		self.remove = remove = function(name) {
			//REQUIRED: name

			var
			// full name
			fullName = genFullName(name);

			sessionStorage.removeItem(fullName);
			localStorage.removeItem(fullName);
		};
	}
});
