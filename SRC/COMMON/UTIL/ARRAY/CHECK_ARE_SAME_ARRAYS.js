/**
 * check are same arrays.
 */
global.CHECK_ARE_SAME_ARRAYS = CHECK_ARE_SAME_ARRAYS = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.array1
		//OPTIONAL: params.array2

		var
		// array1
		array1 = params.array1,

		// array2
		array2 = params.array2,

		// are same
		areSame;

		if (array1 === undefined || array2 === undefined || array1.length !== array2.length) {
			return false;
		}

		areSame = EACH(array1, function(value, i) {

			if ( value instanceof Date === true) {
				if (array2[i] instanceof Date !== true || value.getTime() !== array2[i].getTime()) {
					return false;
				}
			} else if (CHECK_IS_DATA(value) === true) {

				if (CHECK_ARE_SAME_DATA_SET({
					data1 : value,
					data2 : array2[i]
				}) !== true) {

					return false;
				}

			} else if (CHECK_IS_ARRAY(value) === true) {

				if (CHECK_ARE_SAME_ARRAYS({
					array1 : value,
					array2 : array2[i]
				}) !== true) {

					return false;
				}

			} else if (value !== array2[i]) {
				return false;
			}
		});

		return areSame;
	}
});
