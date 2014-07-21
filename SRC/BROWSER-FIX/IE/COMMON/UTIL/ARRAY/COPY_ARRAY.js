OVERRIDE(COPY_ARRAY, function(origin) {'use strict';

	/**
	 * Copy array. (fix for IE.)
	 */
	global.COPY_ARRAY = COPY_ARRAY = METHOD({

		run : function(array) {
			//REQUIRED: array

			var
			// copy.
			f = function(data) {

				var
				// copy
				copy,

				// value
				value,

				// i
				i;

				if (CHECK_IS_DATA(data) === true) {

					copy = {};

					for (i in data) {
						if (data.hasOwnProperty(i) === true) {
							value = data[i];

							if ( value instanceof Date === true) {
								copy[i] = new Date(value.getTime());
							} else if (CHECK_IS_DATA(value) === true) {
								copy[i] = f(value);
							} else if (CHECK_IS_ARRAY(value) === true) {
								copy[i] = f(value);
							} else {
								copy[i] = value;
							}
						}
					}

				} else if (CHECK_IS_ARRAY(data) === true) {

					copy = [];

					for ( i = 0; i < data.length; i += 1) {
						value = data[i];

						if ( value instanceof Date === true) {
							copy.push(new Date(value.getTime()));
						} else if (CHECK_IS_DATA(value) === true) {
							copy.push(f(value));
						} else if (CHECK_IS_ARRAY(value) === true) {
							copy.push(f(value));
						} else {
							copy.push(value);
						}
					}
				}

				return copy;
			};

			return f(array);
		}
	});
});
