/**
 * go another view.
 */
global.GO = METHOD({

	run : function(uri) {
		'use strict';
		//OPTIONAL: uri

		location.href = HREF(uri);
	}
});
