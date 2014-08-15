/**
 * run funcs in parallel.
 */
global.PARALLEL = PARALLEL = METHOD({

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

		if (funcs === undefined) {
			funcs = countOrArray;
			countOrArray = undefined;
		}

		if (countOrArray !== undefined) {
			if (CHECK_IS_ARRAY(countOrArray) !== true) {
				count = countOrArray;
			} else {
				array = countOrArray;
			}
		}

		if (count !== undefined) {

			REPEAT(count, function() {

				funcs[0](i, function() {

					doneCount += 1;

					if (doneCount === count) {
						funcs[1]();
					}
				});
			});

		} else if (array !== undefined) {

			EACH(array, function(value) {

				funcs[0](value, function() {

					doneCount += 1;

					if (doneCount === count) {
						funcs[1]();
					}
				});
			});

		} else {

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
	}
});
