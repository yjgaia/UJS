/**
 * check is array.
 */
global.CHECK_IS_ARRAY = CHECK_IS_ARRAY = METHOD({

	run : function(data) {'use strict';
		//OPTIONAL: data

		if (data !== undefined && data !== TO_DELETE && typeof data === 'object' && Object.prototype.toString.call(data) === '[object Array]') {
			return true;
		}

		return false;
	}
});
