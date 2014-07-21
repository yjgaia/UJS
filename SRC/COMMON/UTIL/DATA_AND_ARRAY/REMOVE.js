/**
 * remove at some value in data.
 */
global.REMOVE = REMOVE = METHOD({

	run : function(paramsOrData, filter) {'use strict';
		//REQUIRED: paramsOrData
		//OPTIONAL: paramsOrData.data
		//OPTIONAL: paramsOrData.key
		//OPTIONAL: paramsOrData.value
		//OPTIONAL: filter

		var
		// data
		data,

		// key
		key,

		// value
		value;

		// when filter exists
		if (filter !== undefined) {

			EACH(paramsOrData, function(value, key) {

				// remove value passed filter.
				if (filter(value) === true) {

					REMOVE({
						data : paramsOrData,
						key : key
					});
				}
			});

		} else {

			// init properties.
			data = paramsOrData.data;
			key = paramsOrData.key;
			value = paramsOrData.value;

			// remove at {key}.
			if (key !== undefined) {

				// if array
				if (CHECK_IS_ARRAY(data) === true) {
					data.splice(key, 1);
				}

				// if data
				else if (CHECK_IS_DATA(data) === true) {
					delete data[key];
				}
			}

			// remove {value}.
			else {

				EACH(data, function(_value, key) {

					if (_value === value) {

						REMOVE({
							data : data,
							key : key
						});
					}
				});
			}
		}
	}
});
