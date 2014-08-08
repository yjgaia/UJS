/**
 * find name or key in data or array.
 */
global.FIND = FIND = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.data
		//OPTIONAL: params.array
		//REQUIRED: params.value

		var
		// data
		data = params.data,

		// array
		array = params.array,

		// value
		value = params.value,

		// ret key
		retKey;

		if (data !== undefined) {

			EACH(data, function(_value, name) {
				if (_value === value) {
					retKey = name;
					return false;
				}
			});
		}

		if (array !== undefined) {

			EACH(array, function(_value, key) {
				if (_value === value) {
					retKey = key;
					return false;
				}
			});
		}

		return retKey;
	}
});
