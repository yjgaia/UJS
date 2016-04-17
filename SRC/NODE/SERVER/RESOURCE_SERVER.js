/*
 * create resourec server.
 */
global.RESOURCE_SERVER = CLASS(function(cls) {
	'use strict';

	var
	//IMPORT: path
	path = require('path'),

	//IMPORT: querystring
	querystring = require('querystring'),

	// get content type from uri.
	getContentTypeFromURI;

	cls.getContentTypeFromURI = getContentTypeFromURI = function(uri) {
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

		// svg
		if (extname === '.svg') {
			return 'image/svg+xml';
		}

		// javascript
		if (extname === '.js') {
			return 'application/javascript';
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

		// markdown
		if (extname === '.markdown' || extname === '.md') {
			return 'text/x-markdown';
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

		init : function(inner, self, portOrParams, requestListenerOrHandlers) {
			//REQUIRED: portOrParams
			//OPTIONAL: portOrParams.port
			//OPTIONAL: portOrParams.securedPort
			//OPTIONAL: portOrParams.securedKeyFilePath
			//OPTIONAL: portOrParams.securedCertFilePath
			//OPTIONAL: portOrParams.noParsingParamsURI
			//OPTIONAL: portOrParams.rootPath
			//OPTIONAL: portOrParams.version
			//OPTIONAL: requestListenerOrHandlers
			//OPTIONAL: requestListenerOrHandlers.requestListener
			//OPTIONAL: requestListenerOrHandlers.error
			//OPTIONAL: requestListenerOrHandlers.notExistsResource

			var
			//IMPORT: path
			path = require('path'),

			// port
			port,

			// secured port
			securedPort,

			// origin root path
			originRootPath,

			// version
			version,

			// request listener.
			requestListener,

			// error handler.
			errorHandler,

			// not exists resource handler.
			notExistsResourceHandler,

			// resource caches
			resourceCaches = {},

			// web server
			webServer,
			
			// get native http server.
			getNativeHTTPServer,
			
			// get native https server.
			getNativeHTTPSServer;

			// init params.
			if (CHECK_IS_DATA(portOrParams) !== true) {
				port = portOrParams;
			} else {
				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				originRootPath = portOrParams.rootPath;
				version = String(portOrParams.version);
			}

			if (requestListenerOrHandlers !== undefined) {
				if (CHECK_IS_DATA(requestListenerOrHandlers) !== true) {
					requestListener = requestListenerOrHandlers;
				} else {
					requestListener = requestListenerOrHandlers.requestListener;
					errorHandler = requestListenerOrHandlers.error;
					notExistsResourceHandler = requestListenerOrHandlers.notExistsResource;
				}
			}

			webServer = WEB_SERVER(portOrParams, function(requestInfo, response, onDisconnected) {

				var
				// root path
				rootPath = originRootPath,

				// is going on
				isGoingOn,

				// original uri
				originalURI = requestInfo.uri,

				// uri
				uri = requestInfo.uri,

				// method
				method = requestInfo.method,

				// params
				params = requestInfo.params,

				// headers
				headers = requestInfo.headers,

				// overriding response info
				overrideResponseInfo = {},

				// response not found.
				responseNotFound,

				// response error.
				responseError;

				NEXT([
				function(next) {

					if (requestListener !== undefined) {

						isGoingOn = requestListener(requestInfo, response, onDisconnected, function(newRootPath) {
							rootPath = newRootPath;
						}, function(_overrideResponseInfo) {

							if (_overrideResponseInfo !== undefined) {
								overrideResponseInfo = _overrideResponseInfo;
							}

							DELAY(next);
						});

						// init properties again.
						uri = requestInfo.uri;
						method = requestInfo.method;
						params = requestInfo.params;
						headers = requestInfo.headers;
					}

					if (isGoingOn !== false && requestInfo.isResponsed !== true) {
						next();
					}
				},

				function() {
					return function() {

						// check ETag.
						if (CONFIG.isDevMode !== true && (overrideResponseInfo.isFinal !== true ?

						// check version.
						(version !== undefined && headers['if-none-match'] === version) :

						// check exists.
						headers['if-none-match'] !== undefined)) {

							// response cached.
							response(EXTEND({
								origin : {
									statusCode : 304
								},
								extend : overrideResponseInfo
							}));
						}

						// redirect correct version uri.
						else if (CONFIG.isDevMode !== true && overrideResponseInfo.isFinal !== true && version !== undefined && originalURI !== '' && params.version !== version) {

							response(EXTEND({
								origin : {
									statusCode : 302,
									headers : {
										'Location' : '/' + originalURI + '?' + querystring.stringify(COMBINE([params, {
											version : version
										}]))
									}
								},
								extend : overrideResponseInfo
							}));
						}

						// response resource file.
						else if (rootPath !== undefined && method === 'GET') {

							responseNotFound = function(resourcePath) {

								if (notExistsResourceHandler !== undefined) {
									isGoingOn = notExistsResourceHandler(resourcePath, requestInfo, response);
								}

								if (isGoingOn !== false && requestInfo.isResponsed !== true) {

									response(EXTEND({
										origin : {
											statusCode : 404
										},
										extend : overrideResponseInfo
									}));
								}
							};

							responseError = function(errorMsg) {

								if (errorHandler !== undefined) {
									isGoingOn = errorHandler(errorMsg, requestInfo, response);
								} else {
									console.log(CONSOLE_RED('[UJS-RESOURCE_SERVER] ERROR: ' + errorMsg));
								}

								if (isGoingOn !== false && requestInfo.isResponsed !== true) {

									response(EXTEND({
										origin : {
											statusCode : 500
										},
										extend : overrideResponseInfo
									}));
								}
							};

							NEXT([
							function(next) {

								var
								// resource cache
								resourceCache = resourceCaches[originalURI];

								if (resourceCache !== undefined) {
									next(resourceCache.buffer, resourceCache.contentType);
								} else {

									// serve file.
									READ_FILE(rootPath + '/' + uri, {

										notExists : function() {

											// not found file, so serve index.
											READ_FILE(rootPath + (uri === '' ? '' : ('/' + uri)) + '/index.html', {

												notExists : function() {
													responseNotFound(rootPath + '/' + uri);
												},
												error : responseError,

												success : function(buffer) {
													next(buffer, 'text/html');
												}
											});
										},

										error : responseError,
										success : next
									});
								}
							},

							function() {
								return function(buffer, contentType) {

									if (contentType === undefined) {
										contentType = getContentTypeFromURI(uri);
									}

									if (CONFIG.isDevMode !== true && overrideResponseInfo.isFinal !== true && resourceCaches[originalURI] === undefined) {
										resourceCaches[originalURI] = {
											buffer : buffer,
											contentType : contentType
										};
									}

									response(EXTEND({
										origin : {
											buffer : buffer,
											contentType : contentType,
											version : version
										},
										extend : overrideResponseInfo
									}));
								};
							}]);

						} else {
							response(EXTEND({
								origin : {
									statusCode : 404
								},
								extend : overrideResponseInfo
							}));
						}
					};
				}]);
			});

			console.log('[UJS-RESOURCE_SERVER] RUNNING RESOURCE SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));

			self.getNativeHTTPServer = getNativeHTTPServer = function() {
				return webServer.getNativeHTTPServer();
			};
			
			self.getNativeHTTPSServer = getNativeHTTPSServer = function() {
				return webServer.getNativeHTTPSServer();
			};
		}
	};
});
