/**
 * check is empty data.
 */
global.CHECK_IS_EMPTY_DATA = CHECK_IS_EMPTY_DATA = METHOD({

	run : function(data) {'use strict';
		//REQUIRED: data

		return CHECK_ARE_SAME_DATA_SET({
			data1 : data,
			data2 : {}
		});
	}
});
