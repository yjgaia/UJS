/**
 * pack data with Date type.
 */
global.PACK_DATA = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// result
		result = COPY(data),

		// date attribute names
		dateAttrNames = [];

		EACH(result, function(value, name) {

			// when value is Date type
			if ( value instanceof Date === true) {

				// change to timestamp integer.
				result[name] = INTEGER(value.getTime());
				dateAttrNames.push(name);
			}

			// when value is data
			else if (CHECK_IS_DATA(value) === true) {
				result[name] = PACK_DATA(value);
			}

			// when value is array
			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, function(v, i) {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = PACK_DATA(v);
					}
				});
			}
		});

		result.__DATE_ATTR_NAMES = dateAttrNames;

		return result;
	}
});
