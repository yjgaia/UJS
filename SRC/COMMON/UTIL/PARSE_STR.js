/**
 * parse stringified data.
 */
global.PARSE_STR = PARSE_STR = METHOD({

	run : function(stringifiedData) {
		'use strict';
		//REQUIRED: stringifiedData

		var
		// value
		value;

		try {

			value = JSON.parse(stringifiedData);

			return CHECK_IS_DATA(value) === true ? UNPACK_DATA(value) : value;

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});
