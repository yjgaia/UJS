OVERRIDE(REMOVE_TO_DELETE, function(origin) {
	'use strict';

	/**
	 * Pack data. (fix for IE)
	 */
	global.REMOVE_TO_DELETE = REMOVE_TO_DELETE = METHOD({

		run : function(dataOrArray) {
			//REQUIRED: dataOrArray

			var f = function(dataOrArray) {

				// when dataOrArray is data
				if (CHECK_IS_DATA(dataOrArray) === true) {

					EACH(dataOrArray, function(value, name) {

						if (value === TO_DELETE) {

							REMOVE({
								data : dataOrArray,
								name : name
							});

						} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
							f(value);
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
							f(value);
						}
					});
				}
			};

			return f(dataOrArray);
		}
	});
});
