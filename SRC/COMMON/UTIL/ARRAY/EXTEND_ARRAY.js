/**
 * extend array.
 */
global.EXTEND_ARRAY = EXTEND_ARRAY = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.origin
		//REQUIRED: params.extend

		var
		// origin
		origin = params.origin,

		// extend
		extend = params.extend;

		EACH(extend, function(value) {

			var
			// temp
			temp;

			if ( value instanceof Date === true) {
				origin.push(new Date(value.getTime()));
			} else if (CHECK_IS_DATA(value) === true) {
				origin.push(COPY_DATA(value));
			} else if (CHECK_IS_ARRAY(value) === true) {
				origin.push(COPY_ARRAY(value));
			} else {
				origin.push(value);
			}
		});
	}
});
