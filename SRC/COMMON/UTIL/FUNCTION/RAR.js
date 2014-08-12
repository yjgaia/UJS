/**
 * run `func` and return it.
 */
global.RAR = RAR = METHOD({

	run : function(params, func) {
		'use strict';
		//OPTIONAL: params
		//REQUIRED: func

		// init params and func.
		if (func === undefined) {
			func = params;
			params = undefined;
		}

		func(params);

		return func;
	}
});
