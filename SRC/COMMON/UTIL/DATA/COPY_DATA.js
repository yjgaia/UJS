/**
 * copy data.
 */
global.COPY_DATA = COPY_DATA = METHOD({

	run : function(data) {'use strict';
		//REQUIRED: data

		var
		// copy
		copy = {};

		EACH(data, function(value, name) {
			if ( value instanceof Date === true) {
				copy[name] = new Date(value.getTime());
			} else if (CHECK_IS_DATA(value) === true) {
				copy[name] = COPY_DATA(value);
			} else if (CHECK_IS_ARRAY(value) === true) {
				copy[name] = COPY_ARRAY(value);
			} else {
				copy[name] = value;
			}
		});

		return copy;
	}
});
