/**
 * check are same data set.
 */
global.CHECK_ARE_SAME_DATA_SET = CHECK_ARE_SAME_DATA_SET = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.data1
		//OPTIONAL: params.data2

		var
		// data1
		data1 = params.data1,

		// data2
		data2 = params.data2,

		// check.
		check;

		if (data1 === undefined || data2 === undefined) {
			return false;
		}

		check = function(data1, data2) {

			var
			// are same
			areSame;

			areSame = EACH(data1, function(value, name) {

				if ( value instanceof Date === true) {
					if (data2[name] instanceof Date !== true || value.getTime() !== data2[name].getTime()) {
						return false;
					}
				} else if (CHECK_IS_DATA(value) === true) {

					if (CHECK_ARE_SAME_DATA_SET({
						data1 : value,
						data2 : data2[name]
					}) !== true) {

						return false;
					}

				} else if (CHECK_IS_ARRAY(value) === true) {

					if (CHECK_ARE_SAME_ARRAYS({
						array1 : value,
						array2 : data2[name]
					}) !== true) {

						return false;
					}

				} else if (value !== data2[name]) {
					return false;
				}
			});

			return areSame;
		};

		return check(data1, data2) === true && check(data2, data1) === true;
	}
});
