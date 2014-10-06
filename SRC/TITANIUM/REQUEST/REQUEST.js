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
		//OPTIONAL: params.uri
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
		paramStr = params.paramStr,

		// data
		data = params.data,

		// response listener
		responseListener,

		// error listener
		errorListener,

		// url
		url,

		// http request
		req;

		method = method.toUpperCase();

		if (uri !== undefined && uri.indexOf('?') !== -1) {
			paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
			uri = uri.substring(0, uri.indexOf('?'));
		}

		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + 'data=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}

		url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : uri);

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
