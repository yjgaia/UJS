/**
 * Titanium store class
 */
global.STORE = STORE = CLASS({

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

			var
			// name
			name = params.name,

			// value
			value = params.value;

			Ti.App.Properties.setString(genFullName(name), STRINGIFY(value));
		};

		self.get = get = function(name) {
			//REQUIRED: name

			var
			// v
			v = Ti.App.Properties.getString(genFullName(name));

			return PARSE_STR(v === TO_DELETE ? undefined : v);
		};

		self.remove = remove = function(name) {
			//REQUIRED: name

			Ti.App.Properties.removeProperty(genFullName(name));
		};
	}
});
