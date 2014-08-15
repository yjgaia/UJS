/*
 * create web server.
 */
global.WEB_SERVER = WEB_SERVER = CLASS(function(cls) {
	'use strict';

	var
	//IMPORT: http
	http = require('http'),

	//IMPORT: querystring
	querystring = require('querystring'),

	//IMPORT: zlib
	zlib = require('zlib'),

	// get encoding from content type.
	getEncodingFromContentType;

	cls.getEncodingFromContentType = getEncodingFromContentType = function(contentType) {
		//REQUIRED: contentType

		if (contentType === 'text/javascript') {
			return 'utf-8';
		}

		if (contentType === 'text/css') {
			return 'utf-8';
		}

		if (contentType === 'text/plain') {
			return 'binary';
		}

		if (contentType === 'text/html') {
			return 'utf-8';
		}

		if (contentType === 'image/png') {
			return 'binary';
		}

		if (contentType === 'image/jpeg') {
			return 'binary';
		}

		if (contentType === 'image/gif') {
			return 'binary';
		}

		if (contentType === 'application/x-shockwave-flash') {
			return 'binary';
		}

		if (contentType === 'audio/mpeg') {
			return 'binary';
		}

		return 'binary';
	};

	return {

		init : function(inner, self, portOrParams, requestListener) {
			'use strict';
			//REQUIRED: portOrParams
			//OPTIONAL: portOrParams.port
			//OPTIONAL: portOrParams.securedPort
			//OPTIONAL: portOrParams.securedKeyFilePath
			//OPTIONAL: portOrParams.securedCertFilePath
			//OPTIONAL: portOrParams.notParsingNativeReqURIs
			//REQUIRED: requestListener

			var
			// port
			port,

			// secured port
			securedPort,

			// secured key file path
			securedKeyFilePath,

			// secured cert file path
			securedCertFilePath,

			// not parsing native req uris
			notParsingNativeReqURIs,

			// server
			nativeHTTPServer,

			// serve.
			serve,

			// get native http server.
			getNativeHTTPServer;

			// init params.
			if (CHECK_IS_DATA(portOrParams) !== true) {
				port = portOrParams;
			} else {
				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				securedKeyFilePath = portOrParams.securedKeyFilePath;
				securedCertFilePath = portOrParams.securedCertFilePath;
				notParsingNativeReqURIs = portOrParams.notParsingNativeReqURIs;
			}

			serve = function(nativeReq, nativeRes) {

				var
				// headers
				headers = nativeReq.headers,

				// uri
				uri = nativeReq.url,

				// method
				method = nativeReq.method.toUpperCase(),

				// ip
				ip = headers['X-Forwarded-For'],

				// accept encoding
				acceptEncoding = headers['accept-encoding'],

				// disconnected methods
				disconnectedMethods = [],

				// param str
				paramStr,

				// request info
				requestInfo;

				if (ip === undefined) {
					ip = nativeReq.connection.remoteAddress;
				}

				if (acceptEncoding === undefined) {
					acceptEncoding = '';
				}

				if (uri.indexOf('?') != -1) {
					paramStr = uri.substring(uri.indexOf('?') + 1);
					uri = uri.substring(0, uri.indexOf('?'));
				}

				uri = uri.substring(1);

				NEXT([
				function(next) {

					if (method === 'GET' || CHECK_IS_IN({
						array : notParsingNativeReqURIs,
						value : uri
					}) === true) {
						next();
					} else {

						nativeReq.on('data', function(data) {
							if (paramStr === undefined) {
								paramStr = '';
							}
							paramStr += data;
						});

						nativeReq.on('end', function() {
							next();
						});
					}
				},

				function() {
					return function() {

						requestListener( requestInfo = {

							headers : headers,

							uri : uri,

							method : method,

							params : querystring.parse(paramStr),

							ip : ip,

							cookies : PARSE_COOKIE_STR(headers.cookie),

							nativeReq : nativeReq
						},

						// response.
						function(contentOrParams) {
							//REQUIRED: contentOrParams
							//OPTIONAL: contentOrParams.statusCode
							//OPTIONAL: contentOrParams.headers
							//OPTIONAL: contentOrParams.contentType
							//OPTIONAL: contentOrParams.content
							//OPTIONAL: contentOrParams.buffer
							//OPTIONAL: contentOrParams.encoding
							//OPTIONAL: contentOrParams.version
							//OPTIONAL: contentOrParams.isFinal

							var
							// status code
							statusCode,

							// headers
							headers,

							// content type
							contentType,

							// content
							content,

							// buffer
							buffer,

							// encoding
							encoding,

							// version
							version,

							// is final
							isFinal;

							if (requestInfo.isResponsed !== true) {

								if (CHECK_IS_DATA(contentOrParams) !== true) {
									content = contentOrParams;
								} else {
									statusCode = contentOrParams.statusCode;
									headers = contentOrParams.headers;
									contentType = contentOrParams.contentType;
									content = contentOrParams.content;
									buffer = contentOrParams.buffer;
									encoding = contentOrParams.encoding;
									version = contentOrParams.version;
									isFinal = contentOrParams.isFinal;
								}

								if (statusCode === undefined) {
									statusCode = 200;
								}

								if (headers === undefined) {
									headers = {};
								}

								if (contentType !== undefined) {

									if (encoding === undefined) {
										encoding = getEncodingFromContentType(contentType);
									}

									headers['Content-Type'] = contentType + '; charset=' + encoding;
								}

								if (CONFIG.isDevMode !== true) {
									if (isFinal === true) {
										headers['ETag'] = 'FINAL';
									} else if (version !== undefined) {
										headers['ETag'] = version;
									}
								}

								// when deflate encoding
								if (acceptEncoding.match(/\bdeflate\b/) !== TO_DELETE) {

									headers['content-encoding'] = 'deflate';

									zlib.deflate(buffer !== undefined ? buffer : content, function(error, buffer) {
										nativeRes.writeHead(statusCode, headers);
										nativeRes.end(buffer, encoding);
									});
								}

								// when gzip encoding
								else if (acceptEncoding.match(/\bgzip\b/) !== TO_DELETE) {

									headers['content-encoding'] = 'gzip';

									zlib.gzip(buffer !== undefined ? buffer : content, function(error, buffer) {
										nativeRes.writeHead(statusCode, headers);
										nativeRes.end(buffer, encoding);
									});
								}

								// when not encoding
								else {
									nativeRes.writeHead(statusCode, headers);
									nativeRes.end(buffer !== undefined ? buffer : content, encoding);
								}

								requestInfo.isResponsed = true;
							}
						},

						// on disconnected.
						function(method) {
							disconnectedMethods.push(method);
						});
					};
				}]);

				if (CHECK_IS_IN({
					array : notParsingNativeReqURIs,
					value : uri
				}) !== true) {

					nativeReq.on('close', function() {
						EACH(disconnectedMethods, function(method) {
							method();
						});
					});
				}
			};

			// init sever.
			if (port !== undefined) {
				nativeHTTPServer = http.createServer(serve).listen(port);
			}

			// init secured sever.
			if (securedPort !== undefined) {

				nativeHTTPServer = https.createServer({
					key : fs.readFileSync(securedKeyFilePath),
					cert : fs.readFileSync(securedCertFilePath)
				}, serve).listen(securedPort);
			}

			console.log('[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));

			self.getNativeHTTPServer = getNativeHTTPServer = function() {
				return nativeHTTPServer;
			};
		}
	};
});
