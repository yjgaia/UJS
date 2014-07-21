/**
 * check is arguments.
 */
global.CHECK_IS_ARGUMENTS = CHECK_IS_ARGUMENTS = METHOD({

	run : function(data) {'use strict';
		//OPTIONAL: data

		if (data !== undefined && data !== TO_DELETE && typeof data === 'object' && (Object.prototype.toString.call(data) === '[object Arguments]' || (data.callee !== undefined && typeof data.callee === 'function'))) {
			return true;
		}

		return false;
	}
});
