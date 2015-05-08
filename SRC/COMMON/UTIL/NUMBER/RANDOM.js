/**
 * generate random integer.
 */
global.RANDOM = METHOD({

	run : function(limitOrParams) {
		'use strict';
		//REQUIRED: limitOrParams
		//OPTIONAL: limitOrParams.min
		//OPTIONAL: limitOrParams.max
		//OPTIONAL: limitOrParams.limit

		var
		// min
		min,

		// max
		max,

		// limit
		limit;

		// init limitOrParams.
		if (CHECK_IS_DATA(limitOrParams) !== true) {
			limit = limitOrParams;
		} else {
			min = limitOrParams.min;
			max = limitOrParams.max;
			limit = limitOrParams.limit;
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
