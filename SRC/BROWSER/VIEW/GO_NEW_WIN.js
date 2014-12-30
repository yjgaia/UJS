/**
 * go another view on new window.
 */
global.GO_NEW_WIN = METHOD({

	run : function(uri) {
		'use strict';
		//OPTIONAL: uri

		global.open(HREF(uri));
	}
});
