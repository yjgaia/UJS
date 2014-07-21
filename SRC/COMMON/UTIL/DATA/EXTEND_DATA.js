/**
 * extend data.
 */
global.EXTEND_DATA = EXTEND_DATA = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.origin
		//REQUIRED: params.extend

		var
		// origin
		origin = params.origin,

		// extend
		extend = params.extend;

		EACH(extend, function(value, name) {

			if ( value instanceof Date === true) {

				origin[name] = new Date(value.getTime());

			} else if (CHECK_IS_DATA(value) === true) {

				if (origin[name] === undefined) {
					origin[name] = {};
				}

				EXTEND_DATA({
					origin : origin[name],
					extend : value
				});
			} else if (CHECK_IS_ARRAY(value) === true) {

				if (origin[name] === undefined) {
					origin[name] = [];
				}

				EXTEND_ARRAY({
					origin : origin[name],
					extend : value
				});
			} else {
				origin[name] = value;
			}
		});
	}
});
