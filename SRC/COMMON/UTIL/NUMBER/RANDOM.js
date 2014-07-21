/**
 * generate random integer.
 */
global.RANDOM = RANDOM = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.min
		//OPTIONAL: params.max
		//OPTIONAL: params.limit

		var
		// min
		min = params.min === undefined ? 0 : params.min,

		// max
		max = params.max,

		// limit
		limit = params.limit;

		if (limit !== undefined) {
			max = limit - 1;
		}

		return Math.floor(Math.random() * (max - min + 1) + min);
	}
});
