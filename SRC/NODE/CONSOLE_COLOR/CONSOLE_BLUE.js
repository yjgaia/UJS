/*
 * console blue
 */
global.CONSOLE_BLUE = CONSOLE_BLUE = METHOD({

	run : function(text) {
		'use strict';
		//REQUIRED: text

		return '\033[36m' + text + '\033[0m';
	}
});
