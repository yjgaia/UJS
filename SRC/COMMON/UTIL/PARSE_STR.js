/**
 * parse str.
 */
global.PARSE_STR = PARSE_STR = METHOD({

	run : function(str) {'use strict';
		//REQUIRED: str

		var
		// value
		value;

		try {

			value = JSON.parse(str);

			return CHECK_IS_DATA(value) === true ? UNPACK_DATA(value) : value;

		} catch(e) {

			// when error, return undefined.
			return undefined;
		}
	}
});
