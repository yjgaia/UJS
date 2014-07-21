/**
 * Close window.
 */
global.CLOSE_WIN = CLOSE_WIN = METHOD({

	run : function(path) {
		global.open('about:blank', '_self').close();
	}
});
