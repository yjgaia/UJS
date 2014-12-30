/**
 * remove at name or key or some value in data or array.
 */
global.REMOVE = METHOD({

	run : function(dataOrArrayOrParams, filter) {
		'use strict';
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//OPTIONAL: dataOrArrayOrParams.name
		//OPTIONAL: dataOrArrayOrParams.key
		//OPTIONAL: dataOrArrayOrParams.value
		//OPTIONAL: filter

		var
		// data
		data,

		// array
		array,

		// name
		name,

		// key
		key,

		// value
		value;

		// when filter exists
		if (filter !== undefined) {

			// when dataOrArrayOrParams is data
			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, name) {

					// remove value passed filter.
					if (filter(value) === true) {

						REMOVE({
							data : dataOrArrayOrParams,
							name : name
						});
					}
				});
			}

			// when dataOrArrayOrParams is array
			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, key) {

					// remove value passed filter.
					if (filter(value) === true) {

						REMOVE({
							array : dataOrArrayOrParams,
							key : key
						});
					}
				});
			}
		}

		// when filter not exists
		else {

			// init params.
			data = dataOrArrayOrParams.data;
			array = dataOrArrayOrParams.array;
			name = dataOrArrayOrParams.name;
			key = dataOrArrayOrParams.key;
			value = dataOrArrayOrParams.value;

			// remove at name.
			if (name !== undefined) {
				delete data[name];
			}

			// remove at key.
			if (key !== undefined) {
				array.splice(key, 1);
			}

			// remove value.
			if (value !== undefined) {

				if (data !== undefined) {

					EACH(data, function(_value, name) {

						if (_value === value) {

							REMOVE({
								data : data,
								name : name
							});
						}
					});
				}

				if (array !== undefined) {

					EACH(array, function(_value, key) {

						if (_value === value) {

							REMOVE({
								array : array,
								key : key
							});
						}
					});
				}
			}
		}
	}
});
