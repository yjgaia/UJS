/**
 * convert real number string to real number.
 */
global.REAL = METHOD({

	run : function(realNumberString) {'use strict';
		//OPTIONAL: realNumberString

		return realNumberString === undefined ? undefined : parseFloat(realNumberString);
	}
});
