/**
 * ajax request.
 */
global.REQUEST = REQUEST = METHOD(function() {
	'use strict';

	var
	//IMPORT: http
	http = require('http'),

	//IMPORT: https
	https = require('https');

	return {

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.method
			//REQUIRED: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//REQUIRED: responseListenerOrListeners

			var
			// host
			host = params.host === undefined ? 'localhost' : params.host,

			// is secure
			isSecure = params.isSecure,

			// port
			port = params.port === undefined ? (isSecure !== true ? 80 : 443) : params.port,

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

			// http request
			req;

			if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
				responseListener = responseListenerOrListeners;
			} else {
				responseListener = responseListenerOrListeners.success;
				errorListener = responseListenerOrListeners.error;
			}

			paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

			method = method.toUpperCase();

			// GET request.
			if (method === 'GET') {

				req = (isSecure !== true ? http : https).get({
					hostname : host,
					port : port,
					path : '/' + uri + '?' + paramStr
				}, function(httpResponse) {

					httpResponse.setEncoding('utf-8');
					httpResponse.on('data', function(content) {
						responseListener(content);
					});
				});
			}

			// other request.
			else {

				req = (isSecure !== true ? http : https).request({
					hostname : host,
					port : port,
					path : '/' + uri,
					method : method
				}, function(httpResponse) {

					httpResponse.setEncoding('utf-8');
					httpResponse.on('data', function(content) {
						responseListener(content);
					});
				});

				req.write(paramStr);
				req.end();
			}

			req.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				console.log(CONSOLE_RED('[UPPERCASE.JS-NODE] REQUEST FAILED: ' + errorMsg), params);

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				}
			});
		}
	};
});
