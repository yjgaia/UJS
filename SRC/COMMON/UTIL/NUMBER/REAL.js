/**
 * convert string to real number.
 */
global.REAL = REAL = METHOD({

	run : function(str) {'use strict';
		//OPTIONAL: str

		return str === undefined ? undefined : parseFloat(str);
	}
});
