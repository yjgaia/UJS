/*
 * resourec server.
 */
global.RESOURCE_SERVER = RESOURCE_SERVER = METHOD(function(m) {'use strict';

	var
	//IMPORT: path
	path = require('path'),

	//IMPORT: querystring
	querystring = require('querystring'),

	// get content type from uri.
	getContentTypeFromURI;

	m.getContentTypeFromURI = getContentTypeFromURI = function(uri) {
		//REQUIRED: uri

		var
		// extname
		extname = path.extname(uri);

		// png image
		if (extname === '.png') {
			return 'image/png';
		}

		// jpeg image
		if (extname === '.jpeg' || extname === '.jpg') {
			return 'image/jpeg';
		}

		// gif image
		if (extname === '.gif') {
			return 'image/gif';
		}

		// javascript
		if (extname === '.js') {
			return 'text/javascript';
		}

		// json document
		if (extname === '.json') {
			return 'application/json';
		}

		// css
		if (extname === '.css') {
			return 'text/css';
		}

		// text
		if (extname === '.text' || extname === '.txt') {
			return 'text/plain';
		}

		// html document
		if (extname === '.html') {
			return 'text/html';
		}

		// swf
		if (extname === '.swf') {
			return 'application/x-shockwave-flash';
		}

		// mp3
		if (extname === '.mp3') {
			return 'audio/mpeg';
		}

		return 'application/octet-stream';
	};

	return {

		run : function(params, requestListenerOrHandlers) {
			//REQUIRED: params
			//OPTIONAL: params.port
			//OPTIONAL: params.securedPort
			//OPTIONAL: params.securedKeyFilePath
			//OPTIONAL: params.securedCertFilePath
			//REQUIRED: params.rootPath
			//OPTIONAL: params.version
			//OPTIONAL: params.requestListenerOrHandlers
			//OPTIONAL: params.requestListenerOrHandlers.requestListener
			//OPTIONAL: params.requestListenerOrHandlers.error
			//OPTIONAL: params.requestListenerOrHandlers.notExists

			var
			//IMPORT: path
			path = require('path'),

			// port
			port = params.port,

			// secured port
			securedPort = params.securedPort,

			// origin root path
			originRootPath = params.rootPath,

			// version
			version = params.version,

			// request listener.
			requestListener,

			// error handler.
			errorHandler,

			// not exists handler.
			notExistsHandler;

			if (requestListenerOrHandlers !== undefined) {
				if (CHECK_IS_DATA(requestListenerOrHandlers) !== true) {
					requestListener = requestListenerOrHandlers;
				} else {
					requestListener = requestListenerOrHandlers.requestListener;
					errorHandler = requestListenerOrHandlers.error;
					notExistsHandler = requestListenerOrHandlers.notExists;
				}
			}

			WEB_SERVER(params, function(requestInfo, response, onDisconnected) {

				var
				// root path
				rootPath = originRootPath,

				// is going on
				isGoingOn,

				// uri
				uri = requestInfo.uri,

				// method
				method = requestInfo.method,

				// params
				params = requestInfo.params,

				// headers
				headers = requestInfo.headers,

				// response not found.
				responseNotFound,

				// response error.
				responseError;

				// check ETag.
				if (version !== undefined && headers['if-none-match'] === version) {

					// response cached.
					response({
						statusCode : 304
					});
				}

				// redirect correct version uri.
				else if (version !== undefined && uri !== '' && params.version !== version) {

					response({
						statusCode : 302,
						headers : {
							'Location' : uri + '?' + querystring.stringify(COMBINE_DATA({
								origin : params,
								extend : {
									version : version
								}
							}))
						}
					});
				}

				// response resource file.
				else {

					if (requestListener !== undefined) {

						isGoingOn = requestListener(requestInfo, response, onDisconnected, function(newRootPath) {
							rootPath = newRootPath;
						});

						// init properties again.
						uri = requestInfo.uri;
						method = requestInfo.method;
						params = requestInfo.params;
						headers = requestInfo.headers;
					}

					if (isGoingOn !== false && requestInfo.isResponsed !== true && method === 'GET') {

						responseNotFound = function(path) {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path, requestInfo, response);
							}

							if (requestInfo.isResponsed !== true) {

								response({
									statusCode : 404
								});
							}
						};

						responseError = function(errorMsg) {

							console.log(CONSOLE_RED('[UPPERCASE.JS-RESOURCE_SERVER] ERROR: ' + errorMsg));

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, requestInfo, response);
							}

							if (requestInfo.isResponsed !== true) {

								response({
									statusCode : 500
								});
							}
						};

						NEXT([
						function(next) {

							// serve file.
							READ_FILE(rootPath + '/' + uri, {

								notExists : function() {

									// not found file, so serve index.
									READ_FILE(rootPath + (uri === '' ? '' : ('/' + uri)) + '/index.html', {

										notExists : responseNotFound,
										error : responseError,

										success : function(content) {
											next(content, 'text/html');
										}
									});
								},

								error : responseError,
								success : next
							});
						},

						function() {
							return function(content, contentType) {

								if (contentType === undefined) {
									contentType = getContentTypeFromURI(uri);
								}

								response({
									content : content,
									contentType : contentType,
									headers : {
										'ETag' : version
									}
								});
							};
						}]);
					}
				}
			});

			console.log('[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));
		}
	};
});
