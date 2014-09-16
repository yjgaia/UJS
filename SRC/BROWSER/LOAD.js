/**
 * load JS file.
 */
global.LOAD = LOAD = METHOD({

	run : function(urlOrParams, handlers) {
		'use strict';
		//REQUIRED: urlOrParams
		//REQUIRED: urlOrParams.url
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.isSecure
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.paramStr
		//OPTIONAL: urlOrParams.isNoCache
		//OPTIONAL: handlers
		//OPTIONAL: handlers.error

		var
		// url
		url,

		// is no Cache
		isNoCache,

		// host
		host,

		// port
		port,

		// is secure
		isSecure,

		// uri
		uri,

		// param str
		paramStr,

		// error handler.
		errorHandler,

		// current script
		currentScript,

		// script els
		scriptEls,

		// script el
		scriptEl;

		if (CHECK_IS_DATA(urlOrParams) !== true) {
			url = urlOrParams;
		} else {

			url = urlOrParams.url;

			if (url === undefined) {

				host = urlOrParams.host === undefined ? global.location.hostname : urlOrParams.host;
				port = urlOrParams.port === undefined ? global.location.port : urlOrParams.port;
				isSecure = urlOrParams.isSecure;
				uri = urlOrParams.uri;
				paramStr = urlOrParams.paramStr;

				url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + uri + '?' + paramStr;
			}

			isNoCache = urlOrParams.isNoCache;
		}

		if (handlers !== undefined) {
			errorHandler = handlers.error;
		}

		READY.readyLoad();

		scriptEls = document.getElementsByTagName('script');
		currentScript = scriptEls[scriptEls.length - 1];

		scriptEl = document.createElement('script');
		scriptEl.src = (url.indexOf('?') === -1 ? url + '?' : url + '&') + (isNoCache !== true ? (CONFIG.version !== undefined ? 'version=' + CONFIG.version : '') : (new Date()).getTime());

		scriptEl.onload = function(e) {
			READY.loaded();
		};

		scriptEl.onreadystatechange = function() {
			DELAY(function() {
				READY.loaded();
			});
		};

		try {
			// this work only IE >= 9
			scriptEl.onerror = errorHandler;
		} catch (e) {
			// ignore.
		}

		// create script.
		return DOM({
			el : scriptEl
		}).insertAfter(DOM({
			el : currentScript
		}));
	}
});
