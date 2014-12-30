/**
 * convert integer string to integer number.
 */
global.INTEGER = METHOD({

	run : function(integerString) {
		'use strict';
		//OPTIONAL: integerString

		return integerString === undefined ? undefined : parseInt(integerString, 10);
	}
});
