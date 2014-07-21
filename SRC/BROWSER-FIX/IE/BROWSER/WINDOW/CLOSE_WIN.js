OVERRIDE(CLOSE_WIN, function(origin) {'use strict';

	/**
	 * Close window.
	 */
	global.CLOSE_WIN = CLOSE_WIN = METHOD({

		run : function(path) {
			//REQUIRED: path

			opener = self;
			self.close();
		}
	});
});
