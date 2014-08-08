/**
 * Delay class
 */
global.DELAY = DELAY = CLASS({

	init : function(inner, self, seconds, func) {
		'use strict';
		//REQUIRED: seconds
		//OPTIONAL: func

		var
		// timeout
		timeout,

		// remove.
		remove;

		if (func === undefined) {
			func = seconds;
			seconds = 0;
		}

		timeout = setTimeout(function() {
			func(self);
		}, seconds * 1000);

		self.remove = remove = function() {
			clearTimeout(timeout);
		};
	}
});
