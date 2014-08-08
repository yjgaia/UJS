/**
 * stringify.
 */
global.STRINGIFY = STRINGIFY = METHOD({

	run : function(value) {
		'use strict';
		//REQUIRED: value

		return JSON.stringify(CHECK_IS_DATA(value) === true ? PACK_DATA(value) : value);
	}
});
