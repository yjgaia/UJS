/**
 * remove TO_DELETE properties in data or array.
 */
global.REMOVE_TO_DELETE = REMOVE_TO_DELETE = METHOD({

	run : function(dataOrArray) {
		'use strict';
		//REQUIRED: dataOrArray

		// when dataOrArray is data
		if (CHECK_IS_DATA(dataOrArray) === true) {

			EACH(dataOrArray, function(value, name) {

				if (value === TO_DELETE) {

					REMOVE({
						data : dataOrArray,
						name : name
					});

				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					REMOVE_TO_DELETE(value);
				}
			});
		}

		// when dataOrArray is array
		else if (CHECK_IS_ARRAY(dataOrArray) === true) {

			EACH(dataOrArray, function(value, key) {

				if (value === TO_DELETE) {

					REMOVE({
						array : dataOrArray,
						key : key
					});

				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					REMOVE_TO_DELETE(value);
				}
			});
		}
	}
});
