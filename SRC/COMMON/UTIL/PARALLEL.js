/**
 * run funcs in parallel.
 */
global.PARALLEL = METHOD({

	run : function(countOrArray, funcs) {
		'use strict';
		//OPTIONAL: countOrArray
		//REQUIRED: funcs

		var
		// count
		count,

		// array
		array,

		// done count
		doneCount = 0;

		// only funcs
		if (funcs === undefined) {
			funcs = countOrArray;
			
			RUN(function() {

				var
				// length
				length = funcs.length - 1;

				EACH(funcs, function(func, i) {

					if (i < length) {

						func(function() {

							doneCount += 1;

							if (doneCount === length) {
								funcs[length]();
							}
						});
					}
				});
			});
		}
		
		else {
			
			if (countOrArray === undefined) {
				funcs[1]();
			}
			
			else {
				
				if (CHECK_IS_ARRAY(countOrArray) !== true) {
					count = countOrArray;
				} else {
					array = countOrArray;
				}
		
				if (count !== undefined) {
		
					if (count === 0) {
						funcs[1]();
					} else {
		
						REPEAT(count, function(i) {
		
							funcs[0](i, function() {
		
								doneCount += 1;
		
								if (doneCount === count) {
									funcs[1]();
								}
							});
						});
					}
		
				} else if (array !== undefined) {
		
					if (array.length === 0) {
						funcs[1]();
					} else {
		
						EACH(array, function(value, i) {
		
							funcs[0](value, function() {
		
								doneCount += 1;
		
								if (doneCount === array.length) {
									funcs[1]();
								}
							}, i);
						});
					}
				}
			}
		}
	}
});
