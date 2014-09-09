/**
 * get href.
 */
global.HREF = HREF = METHOD({

	run : function(uri) {
		'use strict';
		//OPTIONAL: uri

		return '#' + (uri === undefined ? '' : uri);
	}
});
