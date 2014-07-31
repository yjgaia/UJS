/**
 * repeat `count` time.
 */
global.REPEAT = REPEAT = METHOD({

	run : function(count, func) {'use strict';
		//REQUIRED: count
		//REQUIRED: func

		var
		// extras
		i;

		for ( i = 0; i < parseInt(count, 10); i += 1) {
			if (func(i) === false) {
				return false;
			}
		}

		return true;
	}
});
