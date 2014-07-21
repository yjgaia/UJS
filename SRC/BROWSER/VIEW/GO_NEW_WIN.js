/**
 * Go another view on new window.
 */
global.GO_NEW_WIN = GO_NEW_WIN = METHOD({

	run : function(uri) {
		//REQUIRED: uri

		global.open(HREF(uri));
	}
});
