/**
 * get scroll left. (px)
 */
global.SCROLL_LEFT = SCROLL_LEFT = METHOD({

	run : function() {
		'use strict';

		return global.pageXOffset;
	}
});
