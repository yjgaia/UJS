/**
 * ajax request.
 */
global.REQUEST = REQUEST = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.isSecure
		//REQUIRED: params.method
		//REQUIRED: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//OPTIONAL: params.isNotUsingLoadingBar
		//REQUIRED: responseListenerOrListeners

		var
		// host
		host = params.host === undefined ? global.location.hostname : params.host,

		// port
		port = params.port === undefined ? global.location.port : params.port,

		// is secure
		isSecure = params.isSecure,

		// method
		method = params.method,

		// uri
		uri = params.uri,

		// param str
		paramStr = params.data !== undefined ? 'data=' + encodeURIComponent(STRINGIFY(params.data)) : params.paramStr,

		// is not using loading bar
		isNotUsingLoadingBar = params.isNotUsingLoadingBar,

		// response listener
		responseListener,

		// error listener
		errorListener,

		// url
		url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + uri,

		// loading bar
		loadingBar,

		// http request
		req;

		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}

		if (isNotUsingLoadingBar !== true) {
			loadingBar = LOADING_BAR();
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

		// Mozilla, Safari, ...
		if (global.XMLHttpRequest !== undefined) {
			req = new XMLHttpRequest();
		}

		// IE
		else if (global.ActiveXObject) {

			try {
				req = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e1) {

				try {
					req = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e2) {
					// ignore.
				}
			}
		}

		// request complete.
		req.onreadystatechange = function() {

			var
			// error
			error;

			// when request completed
			if (req.readyState === 4) {

				if (req.status === 200) {
					responseListener(req.responseText);
				} else {

					error = {
						code : req.status
					};

					if (errorListener !== undefined) {
						errorListener(error);
					} else {
						console.log('[UPPERCASE.JS-REQUEST] REQUEST FAILED:', params, error);
					}
				}

				if (loadingBar !== undefined) {
					loadingBar.done();
				}
			}
		};

		method = method.toUpperCase();

		// GET request.
		if (method === 'GET') {
			req.open(method, url + '?' + paramStr);
			req.send();
		}

		// other request.
		else {
			req.open(method, url);
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			req.send(paramStr);
		}
	}
});
