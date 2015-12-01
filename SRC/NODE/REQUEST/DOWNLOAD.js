/**
 * download HTTP resource.
 */
global.DOWNLOAD = METHOD(function() {
	'use strict';

	var
	//IMPORT: http
	http = require('http'),

	//IMPORT: https
	https = require('https'),
	
	//IMPORT: url
	url = require('url');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//OPTIONAL: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//OPTIONAL: params.url
			//REQUIRED: params.path
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// host
			host = params.host,

			// is secure
			isSecure = params.isSecure,

			// port
			port = params.port === undefined ? (isSecure !== true ? 80 : 443) : params.port,

			// uri
			uri = params.uri,

			// param str
			paramStr = params.paramStr,

			// data
			data = params.data,
			
			// _url
			_url = params.url,
			
			// path
			path = params.path,
			
			// url data
			urlData,

			// callback.
			callback,

			// error handler.
			errorHandler,

			// http request
			req;
			
			if (_url !== undefined) {
				
				urlData = url.parse(_url);
				
				host = urlData.hostname === TO_DELETE ? undefined : urlData.hostname;
				port = urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port);
				isSecure = urlData.protocol === 'https:';
				uri = urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1);
				paramStr = urlData.query === TO_DELETE ? undefined : urlData.query;
				
			} else {
	
				if (uri !== undefined && uri.indexOf('?') !== -1) {
					paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
					uri = uri.substring(0, uri.indexOf('?'));
				}
	
				if (data !== undefined) {
					paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
				}
	
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}

			req = (isSecure !== true ? http : https).get({
				hostname : host,
				port : port,
				path : '/' + (uri === undefined ? '' : uri) + '?' + paramStr
			}, function(httpResponse) {
				
				var
				// data
				data;
				
				// redirect.
				if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
					
					DOWNLOAD({
						url : httpResponse.headers.location,
						path : path
					}, {
						success : callback,
						error : errorHandler
					});
					
					httpResponse.destroy();
					
				} else {
				
					data = [];
	
					httpResponse.on('data', function(chunk) {
						data.push(chunk);
					});
					httpResponse.on('end', function() {
						
						WRITE_FILE({
							path : path,
							buffer : Buffer.concat(data)
						}, {
							success : callback,
							error : errorHandler
						});
					});
				}
			});

			req.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				if (errorHandler !== undefined) {
					errorHandler(errorMsg);
				} else {
					console.log(CONSOLE_RED('[UJS-NODE] DOWNLOAD FAILED: ' + errorMsg), params);
				}
			});
		}
	};
});
