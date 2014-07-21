/**
 * combine array.
 */
global.COMBINE_ARRAY = COMBINE_ARRAY = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.origin
		//OPTIONAL: params.extend

		var
		// origin
		origin = params.origin,

		// extend
		extend = params.extend,

		// result
		result = COPY_ARRAY(origin);

		if (extend !== undefined) {

			EXTEND_ARRAY({
				origin : result,
				extend : extend
			});
		}

		return result;
	}
});
