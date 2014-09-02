/*
 * create socket server.
 */
global.SOCKET_SERVER = SOCKET_SERVER = METHOD({

	run : function(port, connectionListener) {
		'use strict';
		//REQUIRED: port
		//REQUIRED: connectionListener

		var
		// net
		net = require('net'),

		// server
		server = net.createServer(function(conn) {

			var
			// method map
			methodMap = {},

			// send key
			sendKey = 0,

			// received string
			receivedStr = '',

			// is force disconnecting
			isForceDisconnecting,

			// on.
			on,

			// off.
			off,

			// send.
			send,

			// run methods.
			runMethods = function(methodName, data, sendKey) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					EACH(methods, function(method) {

						// run method.
						method(data,

						// ret.
						function(retData) {

							if (sendKey !== undefined) {

								send({
									methodName : '__CALLBACK_' + sendKey,
									data : retData
								});
							}
						});
					});
				}
			};

			// when receive data
			conn.on('data', function(content) {

				var
				// str
				str,

				// index
				index,

				// params
				params;

				receivedStr += content.toString();

				while (( index = receivedStr.indexOf('\n')) !== -1) {

					str = receivedStr.substring(0, index);

					params = PARSE_STR(str);

					if (params !== undefined) {
						runMethods(params.methodName, params.data, params.sendKey);
					}

					receivedStr = receivedStr.substring(index + 1);
				}
			});

			// when disconnected
			conn.on('close', function() {

				if (isForceDisconnecting !== true) {
					runMethods('__DISCONNECTED');
				}

				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				console.log('[UPPERCASE.JS-SOCEKT_SERVER] ERROR:', errorMsg);

				runMethods('__ERROR', errorMsg);
			});

			connectionListener(

			// client info
			{
				ip : conn.remoteAddress
			},

			// on.
			on = function(methodName, method) {
				//REQUIRED: methodName
				//REQUIRED: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			},

			// off.
			off = function(methodName, method) {
				//REQUIRED: methodName
				//OPTIONAL: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						REMOVE({
							array : methods,
							value : method
						});

					} else {
						delete methodMap[methodName];
					}
				}
			},

			// send to client.
			send = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback

				var
				// callback name
				callbackName = '__CALLBACK_' + sendKey;

				params.sendKey = sendKey;

				sendKey += 1;

				conn.write(STRINGIFY(params) + '\n');

				if (callback !== undefined) {

					// on callback.
					on(callbackName, function(data) {

						// run callback.
						callback(data);

						// off callback.
						off(callbackName);
					});
				}
			},

			// disconnect.
			function() {

				isForceDisconnecting = true;

				conn.end();
			});
		});

		// listen.
		server.listen(port);

		console.log('[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:' + port + ')');
	}
});
