/**
 * unpack data with Date type.
 */
global.UNPACK_DATA = METHOD({

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
		
		// when regex attribute names exists
		if (result.__REGEX_ATTR_NAMES !== undefined) {

			// change string to RegExp type.
			EACH(result.__REGEX_ATTR_NAMES, function(regexAttrName, i) {
				
				var
				// pattern
				pattern = result[regexAttrName],
				
				// flags
				flags,
				
				// j
				j;
				
				for (j = pattern.length - 1; j >= 0; j -= 1) {
					if (pattern[j] === '/') {
						flags = pattern.substring(j + 1);
						pattern = pattern.substring(1, j);
						break;
					}
				}
				
				result[regexAttrName] = new RegExp(pattern, flags);
			});
			delete result.__REGEX_ATTR_NAMES;
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
