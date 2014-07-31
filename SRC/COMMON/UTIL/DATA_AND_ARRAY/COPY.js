/**
 * copy data or array.
 */
global.COPY = COPY = METHOD({

	run : function(data) {'use strict';
		//REQUIRED: data

		var
		// copy
		copy;

		// when data is data (JS object)
		if (CHECK_IS_DATA(data) === true) {

			copy = {};

			EXTEND({
				origin : copy,
				extend : data
			});
		}

		// when data is array
		else if (CHECK_IS_ARRAY(data) === true) {

			copy = [];

			EXTEND({
				origin : copy,
				extend : data
			});
		}

		return copy;
	}
});
