/**
 * go another view.
 */
global.GO = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		history.pushState(undefined, undefined, HREF(uri));
		
		MATCH_VIEW.checkAll();
	}
});
