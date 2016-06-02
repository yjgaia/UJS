/**
 * create cookie str array.
 */
global.CREATE_COOKIE_STR_ARRAY = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// strs
		strs = [];

		EACH(data, function(value, name) {
			if (CHECK_IS_DATA(value) === true) {
				strs.push(name + '=' + encodeURIComponent(value.value)
					+ (value.expireSeconds === undefined ? '' : '; expires=' + new Date(Date.now() + value.expireSeconds * 1000).toGMTString())
					+ (value.path === undefined ? '' : '; path=' + value.path)
					+ (value.domain === undefined ? '' : '; domain=' + value.domain));
			} else {
				strs.push(name + '=' + encodeURIComponent(value));
			}
		});

		return strs;
	}
});
