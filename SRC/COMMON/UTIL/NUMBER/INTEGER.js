/**
 * convert string to integer number.
 */
global.INTEGER = INTEGER = METHOD({

	run : function(str) {'use strict';
		//OPTIONAL: str

		return str === undefined ? undefined : parseInt(str, 10);
	}
});
