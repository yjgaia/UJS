/**
 * override something.
 */
global.OVERRIDE = METHOD({

	run : function(origin, func) {
		'use strict';
		//REQUIRED: origin
		//REQUIRED: func

		// when origin is OBJECT.
		if (origin.type !== undefined && origin.type.type === CLASS) {

			// remove origin from init ready objects.
			OBJECT.removeReadyObject(origin);
		}

		func(origin);
	}
});
