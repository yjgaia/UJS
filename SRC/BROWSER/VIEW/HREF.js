/**
 * get href.
 */
global.HREF = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		return '/' + uri;
	}
});
