OVERRIDE(WIN_WIDTH, function(origin) {
	'use strict';

	/**
	 * Get window width. (fix for IE)
	 */
	global.WIN_WIDTH = WIN_WIDTH = METHOD({

		run : function() {
			return document.documentElement.offsetWidth;
		}
	});
});
