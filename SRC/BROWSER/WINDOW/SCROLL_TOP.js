/**
 * get scroll top. (px)
 */
global.SCROLL_TOP = SCROLL_TOP = METHOD({

	run : function() {
		'use strict';

		return global.pageYOffset;
	}
});
