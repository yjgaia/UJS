/**
 * same as `foreach`.
 */
global.EACH = METHOD({

	run : function(dataOrArray, func) {
		'use strict';
		//OPTIONAL: dataOrArray
		//REQUIRED: func

		var
		// length
		length,

		// name
		name,

		// extras
		i;

		// when dataOrArray is undefined
		if (dataOrArray === undefined) {
			return false;
		}

		// when dataOrArray is data
		else if (CHECK_IS_DATA(dataOrArray) === true) {

			for (name in dataOrArray) {
				if (dataOrArray.hasOwnProperty(name) === true) {
					if (func(dataOrArray[name], name) === false) {
						return false;
					}
				}
			}
		}

		// when dataOrArray is array or arguments
		else if (CHECK_IS_ARRAY(dataOrArray) === true || CHECK_IS_ARGUMENTS(dataOrArray) === true) {

			length = dataOrArray.length;

			for ( i = 0; i < length; i += 1) {

				if (func(dataOrArray[i], i) === false) {
					return false;
				}

				// when shrink
				if (dataOrArray.length === length - 1) {
					i -= 1;
					length -= 1;
				}
			}
		}

		// when dataOrArray is func
		else if (func === undefined) {

			func = dataOrArray;
			dataOrArray = undefined;

			return function(dataOrArray) {
				return EACH(dataOrArray, func);
			};
		}

		return true;
	}
});
