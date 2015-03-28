/**
 * same as `foreach`, but reverse.
 */
global.REVERSE_EACH = METHOD({

	run : function(array, func) {
		'use strict';
		//OPTIONAL: array
		//REQUIRED: func

		var
		// length
		length,

		// name
		name,

		// extras
		i;

		// when array is undefined
		if (array === undefined) {
			return false;
		}

		// when array is func
		else if (func === undefined) {

			func = array;
			array = undefined;

			return function(array) {
				return REVERSE_EACH(array, func);
			};
		}

		// when array is not undefined
		else {

			length = array.length;

			for ( i = length - 1; i >= 0; i -= 1) {

				if (func(array[i], i) === false) {
					return false;
				}
			}
		}

		return true;
	}
});
