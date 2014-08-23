/**
 * create cookie str array.
 */
global.CREATE_COOKIE_STR_ARRAY = CREATE_COOKIE_STR_ARRAY = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// strs
		strs = [];

		EACH(data, function(value, name) {
			strs.push(name + '=' + encodeURIComponent(value));
		});

		return strs;
	}
});
