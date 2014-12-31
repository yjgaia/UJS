/**
 * go another view.
 */
global.GO = METHOD({

	run : function(uri) {
		'use strict';
		//OPTIONAL: uri

		history.pushState(undefined, undefined, HREF(uri));
		
		MATCH_VIEW.checkAll();
	}
});
