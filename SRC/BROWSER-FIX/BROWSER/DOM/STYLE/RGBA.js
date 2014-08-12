OVERRIDE(RGBA, function(origin) {
	'use strict';

	/**
	 * Get rgba style string. (fix)
	 */
	global.RGBA = RGBA = METHOD({

		run : function(rgba) {
			//REQUIRED: rgba

			var
			// function
			f;

			f = function(n) {

				var
				// hex
				hex = n.toString(16);

				return hex.length === 1 ? '0' + hex : hex;
			};

			return '#' + f(rgba[0]) + f(rgba[1]) + f(rgba[2]);
		}
	});
});
