/**
 * go another view.
 */
global.GO = GO = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		location.href = HREF(uri);
	}
});
