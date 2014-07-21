/**
 * override something.
 */
global.OVERRIDE = OVERRIDE = METHOD({

	run : function(origin, func) {'use strict';
		//REQUIRED: origin
		//REQUIRED: func

		func(origin);
	}
});
