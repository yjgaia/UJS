/**
 * load JS file.
 */
global.LOAD = LOAD = METHOD({

	run : function(pathOrParams) {
		'use strict';
		//REQUIRED: pathOrParams
		//REQUIRED: pathOrParams.path
		//OPTIONAL: pathOrParams.isNoCache

		var
		// path
		path,

		// is no Cache
		isNoCache,

		// current script
		currentScript = document.currentScript,

		// script els
		scriptEls,

		// script el
		scriptEl;

		if (CHECK_IS_DATA(pathOrParams) !== true) {
			path = pathOrParams;
		} else {
			path = pathOrParams.path;
			isNoCache = pathOrParams.isNoCache;
		}

		READY.readyLoad();

		if (currentScript === undefined || currentScript === TO_DELETE) {
			scriptEls = document.getElementsByTagName('script');
			currentScript = scriptEls[scriptEls.length - 1];
		}

		scriptEl = document.createElement('script');
		scriptEl.src = (path.indexOf('?') === -1 ? path + '?' : path + '&') + (isNoCache !== true ? (CONFIG.version !== undefined ? 'version=' + CONFIG.version : '') : (new Date()).getTime());

		scriptEl.onload = function() {
			READY.loaded();
		};

		scriptEl.onreadystatechange = function() {
			DELAY(function() {
				READY.loaded();
			});
		};

		// create script.
		return DOM({
			el : scriptEl
		}).insertAfter(DOM({
			el : currentScript
		}));
	}
});
