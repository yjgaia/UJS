/**
 * copy array.
 */
global.COPY_ARRAY = COPY_ARRAY = METHOD({

	run : function(array) {'use strict';
		//REQUIRED: array

		var
		// copy
		copy = [];

		EACH(array, function(value, i) {
			if ( value instanceof Date === true) {
				copy.push(new Date(value.getTime()));
			} else if (CHECK_IS_DATA(value) === true) {
				copy.push(COPY_DATA(value));
			} else if (CHECK_IS_ARRAY(value) === true) {
				copy.push(COPY_ARRAY(value));
			} else {
				copy.push(value);
			}
		});

		return copy;
	}
});
