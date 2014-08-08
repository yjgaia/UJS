/**
 * check it is arguments.
 */
global.CHECK_IS_ARGUMENTS = CHECK_IS_ARGUMENTS = METHOD({

	run : function(it) {'use strict';
		//OPTIONAL: it

		if (it !== undefined && it !== TO_DELETE && typeof it === 'object' && (Object.prototype.toString.call(it) === '[object Arguments]' || (it.callee !== undefined && typeof it.callee === 'function'))) {
			return true;
		}

		return false;
	}
});
