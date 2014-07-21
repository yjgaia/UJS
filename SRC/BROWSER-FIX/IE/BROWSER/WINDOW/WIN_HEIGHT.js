OVERRIDE(WIN_HEIGHT, function(origin) {'use strict';

	/**
	 * Get window height. (fix for IE.)
	 */
	global.WIN_HEIGHT = WIN_HEIGHT = METHOD({

		run : function() {
			return document.documentElement.offsetHeight;
		}
	});
});
