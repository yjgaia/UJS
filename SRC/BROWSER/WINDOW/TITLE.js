/**
 * Change document title.
 */
global.TITLE = TITLE = METHOD({

	run : function(title) {
		'use strict';
		//REQUIRED: title

		document.title = title;
	}
});
