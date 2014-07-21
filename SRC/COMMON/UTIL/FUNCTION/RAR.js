/**
 * run and return function.
 */
global.RAR = RAR = METHOD({

	run : function(params, func) {'use strict';
		//OPTIONAL: params
		//REQUIRED: func

		if (func === undefined) {
			func = params;
			func();
		} else {
			func(params);
		}

		return func;
	}
});
