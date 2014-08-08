/**
 * parse stringified object.
 */
global.PARSE_STR = PARSE_STR = METHOD({

	run : function(objectString) {
		'use strict';
		//REQUIRED: objectString

		var
		// value
		value;

		try {

			value = JSON.parse(objectString);

			return CHECK_IS_DATA(value) === true ? UNPACK_DATA(value) : value;

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});
