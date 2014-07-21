/**
 * Go another view.
 */
global.GO = GO = METHOD({

	run : function(uri) {
		//REQUIRED: uri

		location.href = HREF(uri);
	}
});
