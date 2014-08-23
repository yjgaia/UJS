/*
 * console red
 */
global.CONSOLE_RED = CONSOLE_RED = METHOD({

	run : function(text) {
		'use strict';
		//REQUIRED: text

		return '\033[31m' + text + '\033[0m';
	}
});
