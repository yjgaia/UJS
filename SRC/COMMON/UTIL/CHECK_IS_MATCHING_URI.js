/**
 * check is matching uri.
 */
global.CHECK_IS_MATCHING_URI = CHECK_IS_MATCHING_URI = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.format
		//REQUIRED: params.uri
		//REQUIRED: params.params

		var
		// format
		format = params.format,

		// uri
		uri = params.uri,

		// uri params
		uriParams = params.params,

		// uri parts
		uriParts = uri.split('/'),

		// find.
		find = function(format) {

			var
			// format parts
			formatParts = format.split('/'),

			// is matched
			isMatched;

			return EACH(uriParts, function(uriPart, i) {

				var
				// format part
				formatPart = formatParts[i];

				if (formatPart === '**') {
					isMatched = true;
					return false;
				}

				if (formatPart === undefined) {
					return false;
				}

				// find params.
				if (formatPart.charAt(0) === '{' && formatPart.charAt(formatPart.length - 1) === '}') {
					uriParams[formatPart.substring(1, formatPart.length - 1)] = uriPart;
				} else if (formatPart !== '*' && formatPart !== uriPart) {
					return false;
				}

				if (i === uriParts.length - 1 && i < formatParts.length - 1 && formatParts[formatParts.length - 1] !== '') {
					return false;
				}

			}) === true || isMatched === true;
		};

		if (CHECK_IS_ARRAY(format) === true) {
			return EACH(format, function(format) {
				return find(format) !== true;
			}) !== true;
		} else {
			return find(format);
		}
	}
});
