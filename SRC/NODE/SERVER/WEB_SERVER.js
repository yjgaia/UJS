/*
 * create web server.
 */
global.WEB_SERVER = WEB_SERVER = METHOD(function(m) {'use strict';

	var
	//IMPORT: http
	http = require('http'),

	//IMPORT: querystring
	querystring = require('querystring'),

	// get encoding from content type.
	getEncodingFromContentType;

	m.getEncodingFromContentType = getEncodingFromContentType = function(contentType) {
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

		run : function(portOrParams, requestListener) {'use strict';
			//REQUIRED: portOrParams
			//OPTIONAL: portOrParams.port
			//OPTIONAL: portOrParams.securedPort
			//OPTIONAL: portOrParams.securedKeyFilePath
			//OPTIONAL: portOrParams.securedCertFilePath
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

			// serve.
			serve;

			if (CHECK_IS_DATA(portOrParams) !== true) {

				port = portOrParams;

			} else {

				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				securedKeyFilePath = portOrParams.securedKeyFilePath;
				securedCertFilePath = portOrParams.securedCertFilePath;
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

				// disconnected methods
				disconnectedMethods = [],

				// param str
				paramStr,

				// request info
				requestInfo;

				if (ip === undefined) {
					ip = nativeReq.connection.remoteAddress;
				}

				if (uri.indexOf('?') != -1) {
					paramStr = uri.substring(uri.indexOf('?') + 1);
					uri = uri.substring(0, uri.indexOf('?'));
				}

				uri = uri.substring(1);

				NEXT([
				function(next) {

					if (method === 'GET') {
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
						function(params) {
							//REQUIRED: params
							//OPTIONAL: params.statusCode
							//OPTIONAL: params.headers
							//OPTIONAL: params.contentType
							//REQUIRED: params.content
							//OPTIONAL: params.encoding
							//OPTIONAL: params.cacheTime

							var
							// status code
							statusCode,

							// headers
							headers,

							// content type
							contentType,

							// content
							content,

							// encoding
							encoding,

							// cache time
							cacheTime;

							if (requestInfo.isResponsed !== true) {

								if (params !== undefined) {

									statusCode = params.statusCode;
									headers = params.headers;
									contentType = params.contentType;
									content = params.content;
									encoding = params.encoding;
									cacheTime = params.cacheTime;
								}

								if (statusCode === undefined) {
									statusCode = 200;
								}

								if (headers === undefined) {
									headers = {};
								}

								if (contentType !== undefined) {
									headers['Content-Type'] = contentType;

									if (encoding === undefined) {
										encoding = getEncodingFromContentType(contentType);
									}
								}

								if (cacheTime !== undefined) {
									headers['ETag'] = cacheTime;
									headers['Last-Modified'] = new Date(cacheTime).toUTCString();
								}

								nativeRes.writeHead(statusCode, headers);
								nativeRes.end(content, encoding);

								requestInfo.isResponsed = true;
							}
						},

						// on disconnected.
						function(method) {
							disconnectedMethods.push(method);
						});
					};
				}]);

				nativeReq.on('close', function() {
					EACH(disconnectedMethods, function(method) {
						method();
					});
				});
			};

			// init sever.
			if (port !== undefined) {
				http.createServer(serve).listen(port);
			}

			// init secured sever.
			if (securedPort !== undefined) {

				https.createServer({
					key : fs.readFileSync(securedKeyFilePath),
					cert : fs.readFileSync(securedCertFilePath)
				}, serve).listen(securedPort);
			}

			console.log('[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER...' + (port === undefined ? '' : (' (PORT:' + port + ')')) + (securedPort === undefined ? '' : (' (SECURED PORT:' + securedPort + ')')));
		}
	};
});
