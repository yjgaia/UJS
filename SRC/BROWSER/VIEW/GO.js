/**
 * go another view.
 */
global.GO = GO = METHOD({

	run : function(uri) {
		'use strict';
		//OPTIONAL: uri

		location.href = HREF(uri);
	}
});
