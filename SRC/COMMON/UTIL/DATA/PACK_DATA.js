/**
 * pack data.
 */
global.PACK_DATA = PACK_DATA = METHOD({

	run : function(data) {'use strict';
		//REQUIRED: data

		var
		// result
		result = COPY_DATA(data),

		// date attribute names
		dateAttrNames = [];

		EACH(result, function(value, name) {
			if ( value instanceof Date === true) {
				result[name] = INTEGER(value.getTime());
				dateAttrNames.push(name);
			} else if (CHECK_IS_DATA(value) === true) {
				result[name] = PACK_DATA(value);
			} else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, function(v, i) {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = PACK_DATA(v);
					} else {
						// do nothing.
					}
				});
			} else {
				// do nothing.
			}
		});

		result.__DATE_ATTR_NAMES = dateAttrNames;

		return result;
	}
});
