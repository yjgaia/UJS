/**
 * find key in data.
 */
global.FIND_KEY = FIND_KEY = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.value

		var
		// data
		data = params.data,

		// value
		value = params.value,

		// ret key
		retKey;

		EACH(data, function(_value, key) {
			if (_value === value) {
				retKey = key;
				return false;
			}
		});

		return retKey;
	}
});
