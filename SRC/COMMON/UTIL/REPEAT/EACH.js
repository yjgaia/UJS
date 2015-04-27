/**
 * same as `foreach`.
 */
global.EACH = METHOD({

	run : function(dataOrArrayOrString, func) {
		'use strict';
		//OPTIONAL: dataOrArrayOrString
		//REQUIRED: func

		var
		// length
		length,

		// name
		name,

		// extras
		i;

		// when dataOrArrayOrString is undefined
		if (dataOrArrayOrString === undefined) {
			return false;
		}

		// when dataOrArrayOrString is data
		else if (CHECK_IS_DATA(dataOrArrayOrString) === true) {

			for (name in dataOrArrayOrString) {
				if (dataOrArrayOrString.hasOwnProperty(name) === true) {
					if (func(dataOrArrayOrString[name], name) === false) {
						return false;
					}
				}
			}
		}

		// when dataOrArrayOrString is func
		else if (func === undefined) {

			func = dataOrArrayOrString;
			dataOrArrayOrString = undefined;

			return function(dataOrArrayOrString) {
				return EACH(dataOrArrayOrString, func);
			};
		}

		// when dataOrArrayOrString is array or arguments or string
		else {

			length = dataOrArrayOrString.length;

			for ( i = 0; i < length; i += 1) {

				if (func(dataOrArrayOrString[i], i) === false) {
					return false;
				}

				// when shrink
				if (dataOrArrayOrString.length === length - 1) {
					i -= 1;
					length -= 1;
				}
			}
		}

		return true;
	}
});
