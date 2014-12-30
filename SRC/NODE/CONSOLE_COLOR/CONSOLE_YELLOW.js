/*
 * console yellow
 */
global.CONSOLE_YELLOW = METHOD({

	run : function(text) {
		'use strict';
		//REQUIRED: text

		return '\033[33m' + text + '\033[0m';
	}
});
