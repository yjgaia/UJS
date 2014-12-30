/**
 * check it is array.
 */
global.CHECK_IS_ARRAY = METHOD({

	run : function(it) {
		'use strict';
		//OPTIONAL: it

		if (it !== undefined && it !== TO_DELETE && typeof it === 'object' && Object.prototype.toString.call(it) === '[object Array]') {
			return true;
		}

		return false;
	}
});
