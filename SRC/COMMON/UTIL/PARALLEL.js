/**
 * run funcs in parallel.
 */
global.PARALLEL = PARALLEL = METHOD({

	run : function(funcs) {
		'use strict';
		//REQUIRED: funcs

		var
		// length
		length = funcs.length - 1,

		// count
		count = 0;

		EACH(funcs, function(func, i) {

			if (i < length) {

				func(function() {

					count += 1;

					if (count === length) {
						funcs[length]();
					}
				});
			}
		});
	}
});
