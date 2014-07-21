OVERRIDE(REMOVE_TO_DELETE, function(origin) {'use strict';

	/**
	 * Pack data. (fix for IE.)
	 */
	global.REMOVE_TO_DELETE = REMOVE_TO_DELETE = METHOD({

		run : function(data) {
			//REQUIRED: data

			var f = function(data) {

				EACH(data, function(value, key) {

					if (value === TO_DELETE) {

						REMOVE({
							data : data,
							key : key
						});

					} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
						f(value);
					}
				});
			};

			return f(data);
		}
	});
});
