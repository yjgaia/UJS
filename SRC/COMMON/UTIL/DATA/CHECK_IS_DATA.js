/**
 * check is data.
 */
global.CHECK_IS_DATA = CHECK_IS_DATA = METHOD({

	run : function(data) {'use strict';
		//OPTIONAL: data

		if (data !== undefined && data !== TO_DELETE && CHECK_IS_ARGUMENTS(data) !== true && CHECK_IS_ARRAY(data) !== true && data instanceof Date !== true && typeof data === 'object') {
			return true;
		}

		return false;
	}
});
