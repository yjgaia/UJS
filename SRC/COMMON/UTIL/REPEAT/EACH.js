/**
 * same as `foreach`.
 */
global.EACH = EACH = METHOD({

	run : function(data, func) {'use strict';
		//OPTIONAL: data
		//REQUIRED: func

		var
		// length
		length,

		// name
		name,

		// extras
		i;

		if (data === undefined) {
			return false;
		}

		// if array or arguments
		if (CHECK_IS_ARRAY(data) === true || CHECK_IS_ARGUMENTS(data) === true) {

			length = data.length;

			for ( i = 0; i < length; i += 1) {

				if (func(data[i], i) === false) {
					return false;
				}

				// if shrink
				if (data.length === length - 1) {
					i -= 1;
					length -= 1;
				}
			}

		} else {

			for (name in data) {
				if (data.hasOwnProperty(name) === true) {
					if (func(data[name], name) === false) {
						return false;
					}
				}
			}
		}

		return true;
	}
});
