/**
 * unpack data with Date type.
 */
global.UNPACK_DATA = UNPACK_DATA = METHOD({

	run : function(data) {
		'use strict';
		//REQUIRED: data

		var
		// result
		result = COPY(data);

		// when date attribute names exists
		if (result.__DATE_ATTR_NAMES !== undefined) {

			// change timestamp integer to Date type.
			EACH(result.__DATE_ATTR_NAMES, function(dateAttrName, i) {
				result[dateAttrName] = new Date(result[dateAttrName]);
			});
			delete result.__DATE_ATTR_NAMES;
		}

		EACH(result, function(value, name) {

			// when value is data
			if (CHECK_IS_DATA(value) === true) {
				result[name] = UNPACK_DATA(value);
			}

			// when value is array
			else if (CHECK_IS_ARRAY(value) === true) {

				EACH(value, function(v, i) {

					if (CHECK_IS_DATA(v) === true) {
						value[i] = UNPACK_DATA(v);
					}
				});
			}
		});

		return result;
	}
});
