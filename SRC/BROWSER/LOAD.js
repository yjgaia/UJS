/**
 * Load JS file.
 */
global.LOAD = LOAD = METHOD({

	run : function(path) {
		'use strict';
		//REQUIRED: path

		var
		// current script
		currentScript = document.currentScript,

		// script els
		scriptEls;

		if (currentScript === undefined || currentScript === TO_DELETE) {
			scriptEls = document.getElementsByTagName('script');
			currentScript = scriptEls[scriptEls.length - 1];
		}

		// create script.
		return SCRIPT({
			src : (path.indexOf('?') === -1 ? path + '?' : path + '&') + (CONFIG.version !== undefined ? 'version=' + CONFIG.version : '')
		}).insertAfter(DOM({
			el : currentScript
		}));
	}
});
