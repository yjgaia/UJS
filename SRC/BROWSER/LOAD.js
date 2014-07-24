/**
 * Load JS file.
 */
global.LOAD = LOAD = METHOD({

	run : function(path) {'use strict';
		//REQUIRED: path

		return SCRIPT({
			src : (path.indexOf('?') === -1 ? path + '?' : path + '&') + (CONFIG.version !== undefined ? 'version=' + CONFIG.version : '')
		}).appendTo(DOM({
			tag : 'body'
		}));
	}
});
