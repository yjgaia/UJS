/**
 * ajax request.
 */
global.REQUEST = REQUEST = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.host
		//REQUIRED: params.port
		//OPTIONAL: params.isSecure
		//REQUIRED: params.method
		//REQUIRED: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//REQUIRED: responseListenerOrListeners

		var
		// host
		host = params.host,

		// port
		port = params.port,

		// is secure
		isSecure = params.isSecure,

		// method
		method = params.method,

		// uri
		uri = params.uri,

		// param str
		paramStr = params.data !== undefined ? 'data=' + encodeURIComponent(STRINGIFY(params.data)) : params.paramStr,

		// response listener
		responseListener,

		// error listener
		errorListener,

		// url
		url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + uri,

		// http request
		req;

		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

		req = Ti.Network.createHTTPClient({

			onload : function(e) {
				responseListener(this.responseText);
			},

			onerror : function(e) {

				var
				// error
				error = e.error;

				if (errorListener !== undefined) {
					errorListener(error);
				} else {
					console.log('[UPPERCASE.JS-REQUEST] REQUEST FAILED:', params, error);
				}
			}
		});

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
