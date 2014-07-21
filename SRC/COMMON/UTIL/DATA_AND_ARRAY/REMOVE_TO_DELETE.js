/**
 * remove TO_DELETE properties in data.
 */
global.REMOVE_TO_DELETE = REMOVE_TO_DELETE = METHOD({

	run : function(data) {'use strict';
		//REQUIRED: data

		EACH(data, function(value, key) {

			if (value === TO_DELETE) {

				REMOVE({
					data : data,
					key : key
				});

			} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
				REMOVE_TO_DELETE(value);
			}
		});
	}
});
