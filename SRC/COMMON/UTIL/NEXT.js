/**
 * An async control-flow method that makes stepping through logic easy.
 */
global.NEXT = NEXT = METHOD({

	run : function(countOrArray, funcs) {
		'use strict';
		//OPTIONAL: countOrArray
		//REQUIRED: funcs

		var
		// count
		count,

		// array
		array,

		// f.
		f;

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

		FOR({
			start : funcs.length - 1,
			end : 0
		}, function(i) {

			var
			// next.
			next;

			// get last function.
			if (f === undefined) {
				f = funcs[i]();
			}

			// pass next function.
			else if (i > 0) {

				next = f;

				f = funcs[i](next);

				f.next = next;
			}

			// run first function.
			else {

				next = f;

				f = funcs[i];

				if (count !== undefined) {

					RUN(function() {

						var
						// i
						i = 0;

						RUN(function(self) {

							if (i + 1 < count) {
								f(i, self);
							} else {
								f(i, next);
							}

							i += 1;
						});
					});

				} else if (array !== undefined) {

					RUN(function() {

						var
						// length
						length = array.length,

						// i
						i = 0;

						if (length === 0) {
							next();
						} else {

							RUN(function(self) {

								if (i + 1 < length) {

									// if shrink
									if (array.length === length - 1) {
										i -= 1;
										length -= 1;
									}

									f(array[i], self);

								} else {
									f(array[i], next);
								}

								i += 1;
							});
						}
					});

				} else {

					f(next);
				}
			}
		});
	}
});
