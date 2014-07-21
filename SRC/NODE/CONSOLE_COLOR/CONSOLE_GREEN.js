/*
 * console green
 */
global.CONSOLE_GREEN = CONSOLE_GREEN = METHOD({

	run : function(text) {'use strict';
		//REQUIRED: text

		return '\033[32m' + text + '\033[0m';
	}
});
