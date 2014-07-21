/**
 * combine data.
 */
global.COMBINE_DATA = COMBINE_DATA = METHOD({

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
		result = COPY_DATA(origin);

		if (extend !== undefined) {

			EXTEND_DATA({
				origin : result,
				extend : extend
			});
		}

		return result;
	}
});
