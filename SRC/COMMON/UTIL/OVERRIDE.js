/**
 * override something.
 */
global.OVERRIDE = OVERRIDE = METHOD({

	run : function(origin, func) {'use strict';
		//REQUIRED: origin
		//REQUIRED: func

		// check is OBJECT.
		if (origin.type !== undefined && origin.type.type === CLASS) {
			OBJECT.removeReadyObject(origin);
		}

		func(origin);
	}
});
