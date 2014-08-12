/**
 * Get scroll top.
 */
global.SCROLL_TOP = SCROLL_TOP = METHOD({

	run : function() {
		'use strict';

		return global.pageYOffset;
	}
});
