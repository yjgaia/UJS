/**
 * generate random integer.
 */
global.RANDOM = METHOD({

	run : function(maxOrParams) {
		'use strict';
		//REQUIRED: maxOrParams
		//OPTIONAL: maxOrParams.min
		//OPTIONAL: maxOrParams.max
		//OPTIONAL: maxOrParams.limit

		var
		// min
		min,

		// max
		max,

		// limit
		limit;

		// init maxOrParams.
		if (CHECK_IS_DATA(maxOrParams) !== true) {
			max = maxOrParams;
		} else {
			min = maxOrParams.min;
			max = maxOrParams.max;
			limit = maxOrParams.limit;
		}

		if (min === undefined) {
			min = 0;
		}

		if (limit !== undefined) {
			max = limit - 1;
		}

		return Math.floor(Math.random() * (max - min + 1) + min);
	}
});
