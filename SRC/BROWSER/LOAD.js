/**
 * Load JS file.
 */
global.LOAD = LOAD = METHOD({

	run : function(path) {'use strict';
		//REQUIRED: path

		return SCRIPT({
			src : (path.indexOf('?') === -1 ? path + '?' : path + '&') + (CONFIG.version !== undefined ? CONFIG.version : Date.now())
		}).appendTo(DOM({
			tag : 'body'
		}));
	}
});
