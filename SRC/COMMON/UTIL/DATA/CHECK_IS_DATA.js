/**
 * check it is data.
 */
global.CHECK_IS_DATA = METHOD({

	run : function(it) {'use strict';
		//OPTIONAL: it

		if (it !== undefined && it !== TO_DELETE && CHECK_IS_ARGUMENTS(it) !== true && CHECK_IS_ARRAY(it) !== true && it instanceof Date !== true && typeof it === 'object') {
			return true;
		}

		return false;
	}
});
