/**
 * same as `for`.
 */
global.FOR = FOR = METHOD({

	run : function(params, func) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.start
		//OPTIONAL: params.end
		//OPTIONAL: params.limit
		//OPTIONAL: params.step
		//REQUIRED: func

		var
		// start
		start = INTEGER(params.start),

		// end
		end = INTEGER(params.end),

		// limit
		limit = INTEGER(params.limit === undefined ? end + 1 : params.limit),

		// step
		step = INTEGER(params.step === undefined ? 1 : params.step),

		// extras
		i;

		if (end !== undefined && start > end) {

			for ( i = start; i >= end; i -= step) {
				if (func(i) === false) {
					return false;
				}
			}

		} else {

			for ( i = start; i < limit; i += step) {
				if (func(i) === false) {
					return false;
				}
			}
		}

		return true;
	}
});
