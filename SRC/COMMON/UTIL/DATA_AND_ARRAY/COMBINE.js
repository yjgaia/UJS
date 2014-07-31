/**
 * combine data set or arrays.
 */
global.COMBINE = COMBINE = METHOD({

	run : function(dataSet) {'use strict';
		//REQUIRED: dataSet

		var
		// first data
		firstData,

		// result
		result;

		if (dataSet.length > 0) {

			firstData = dataSet[0];

			// when first data is data (JS object)
			if (CHECK_IS_DATA(firstData) === true) {

				result = {};

				EACH(dataSet, function(data) {
					EXTEND({
						origin : result,
						extend : data
					});
				});
			}

			// when first data is array
			else if (CHECK_IS_ARRAY(firstData) === true) {

				result = [];

				EACH(dataSet, function(data) {
					EXTEND({
						origin : result,
						extend : data
					});
				});
			}
		}

		return result;
	}
});
