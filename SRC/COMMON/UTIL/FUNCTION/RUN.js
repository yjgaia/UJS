/**
 * just run.
 *
 * use this if you need a code block.
 */
global.RUN = METHOD({

	run : function(func) {
		'use strict';
		//REQUIRED: func

		var
		// f.
		f = function() {
			return func(f);
		};

		return f();
	}
});
