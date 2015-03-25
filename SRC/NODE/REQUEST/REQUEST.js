/**
 * HTTP request.
 */
global.REQUEST = METHOD(function() {
	'use strict';

	var
	//IMPORT: http
	http = require('http'),

	//IMPORT: https
	https = require('https');

	return {

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//REQUIRED: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.method
			//OPTIONAL: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//REQUIRED: responseListenerOrListeners

			var
			// host
			host = params.host,

			// is secure
			isSecure = params.isSecure,

			// port
			port = params.port === undefined ? (isSecure !== true ? 80 : 443) : params.port,

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

			// http request
			req;

			method = method.toUpperCase();

			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}

			if (data !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
			}

			paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

			if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
				responseListener = responseListenerOrListeners;
			} else {
				responseListener = responseListenerOrListeners.success;
				errorListener = responseListenerOrListeners.error;
			}

			// GET request.
			if (method === 'GET') {

				req = (isSecure !== true ? http : https).get({
					hostname : host,
					port : port,
					path : '/' + (uri === undefined ? '' : uri) + '?' + paramStr
				}, function(httpResponse) {

					var
					// content
					content;
					
					// redirect.
					if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
						
						GET(httpResponse.headers.location, {
							success : responseListener,
							error : errorListener
						});
						
						httpResponse.destroy();
						
					} else {
						
						content = '';

						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', function(str) {
							content += str;
						});
						httpResponse.on('end', function() {
							responseListener(content, httpResponse.headers);
						});
					}
				});
			}

			// other request.
			else {

				req = (isSecure !== true ? http : https).request({
					hostname : host,
					port : port,
					path : '/' + (uri === undefined ? '' : uri),
					method : method
				}, function(httpResponse) {

					var
					// content
					content = '';

					httpResponse.setEncoding('utf-8');
					httpResponse.on('data', function(str) {
						content += str;
					});
					httpResponse.on('end', function() {
						responseListener(content, httpResponse.headers);
					});
				});

				req.write(paramStr);
				req.end();
			}

			req.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					console.log(CONSOLE_RED('[UPPERCASE.JS-NODE] REQUEST FAILED: ' + errorMsg), params);
				}
			});
		}
	};
});
