OVERRIDE(SOUND, function(origin) {

	/**
	 * SOUND class (destroy.)
	 */
	global.SOUND = SOUND = CLASS({

		init : function(inner, self) {
			// destroy.

			var
			// play.
			play,

			// stop.
			stop;

			self.play = play = function() {
				return self;
			};

			self.stop = stop = function() {
				// ignore.
			};
		}
	});
});
