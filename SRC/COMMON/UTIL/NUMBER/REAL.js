/**
 * convert real string to real number.
 */
global.REAL = METHOD({

	run : function(realString) {'use strict';
		//OPTIONAL: realString

		return realString === undefined ? undefined : parseFloat(realString);
	}
});
