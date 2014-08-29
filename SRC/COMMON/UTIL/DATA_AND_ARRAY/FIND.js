/**
 * find name or key in data or array.
 */
global.FIND = FIND = METHOD({

	run : function(dataOrArrayOrParams, filter) {
		'use strict';
		//REQUIRED: dataOrArrayOrParams
		//OPTIONAL: dataOrArrayOrParams.data
		//OPTIONAL: dataOrArrayOrParams.array
		//REQUIRED: dataOrArrayOrParams.value
		//OPTIONAL: filter

		var
		// data
		data,

		// array
		array,

		// value
		value,

		// ret
		ret;

		// when filter exists
		if (filter !== undefined) {

			// when dataOrArrayOrParams is data
			if (CHECK_IS_DATA(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, name) {

					// value passed filter.
					if (filter(value) === true) {
						ret = value;
						return false;
					}
				});
			}

			// when dataOrArrayOrParams is array
			else if (CHECK_IS_ARRAY(dataOrArrayOrParams) === true) {

				EACH(dataOrArrayOrParams, function(value, key) {

					// value passed filter.
					if (filter(value) === true) {
						ret = value;
						return false;
					}
				});
			}
		}

		// when filter not exists
		else {

			// init params.
			data = dataOrArrayOrParams.data;
			array = dataOrArrayOrParams.array;
			value = dataOrArrayOrParams.value;

			if (data !== undefined) {

				EACH(data, function(_value, name) {
					if (_value === value) {
						ret = name;
						return false;
					}
				});
			}

			if (array !== undefined) {

				EACH(array, function(_value, key) {
					if (_value === value) {
						ret = key;
						return false;
					}
				});
			}
		}

		return ret;
	}
});
