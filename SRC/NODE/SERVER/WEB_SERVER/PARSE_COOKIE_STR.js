/**
 * parse cookie str.
 */
global.PARSE_COOKIE_STR = PARSE_COOKIE_STR = METHOD({

	run : function(str) {
		'use strict';
		//OPTIONAL: str

		var
		// splits
		splits,

		// data
		data = {};

		if (str !== undefined) {

			splits = str.split(';');

			EACH(splits, function(cookie) {

				var
				// parts
				parts = cookie.split('=');

				data[parts[0].trim()] = decodeURIComponent(parts[1]);
			});
		}

		return data;
	}
});
