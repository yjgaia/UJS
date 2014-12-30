/**
 * change document title.
 */
global.TITLE = METHOD({

	run : function(title) {
		'use strict';
		//REQUIRED: title

		document.title = title;
	}
});
