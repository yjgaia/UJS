/**
 * get href.
 */
global.HREF = HREF = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		return '#' + uri;
	}
});
