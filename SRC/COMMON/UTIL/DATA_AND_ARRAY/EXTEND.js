/**
 * extend data or array.
 */
global.EXTEND = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.origin
		//REQUIRED: params.extend

		var
		// origin
		origin = params.origin,

		// extend
		extend = params.extend;

		// when origin is data
		if (CHECK_IS_DATA(origin) === true) {

			EACH(extend, function(value, name) {

				if ( value instanceof Date === true) {
					origin[name] = new Date(value.getTime());
				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					origin[name] = COPY(value);
				} else {
					origin[name] = value;
				}
			});
		}

		// when origin is array
		else if (CHECK_IS_ARRAY(origin) === true) {

			EACH(extend, function(value) {

				if ( value instanceof Date === true) {
					origin.push(new Date(value.getTime()));
				} else if (CHECK_IS_DATA(value) === true || CHECK_IS_ARRAY(value) === true) {
					origin.push(COPY(value));
				} else {
					origin.push(value);
				}
			});
		}

		return origin;
	}
});
