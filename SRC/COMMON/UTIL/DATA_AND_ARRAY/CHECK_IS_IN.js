/**
 * check is exists value in data.
 */
global.CHECK_IS_IN = CHECK_IS_IN = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.data
		//REQUIRED: params.value

		var
		// data
		data = params.data,

		// value
		value = params.value;

		return EACH(data, function(_value, key) {
			if (_value === value) {
				return false;
			}
		}) !== true;
	}
});