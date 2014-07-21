/*
 * connect to socket server.
 */
global.CONNECT_TO_SOCKET_SERVER = CONNECT_TO_SOCKET_SERVER = METHOD({

	run : function(params, connectionListenerOrListeners) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.host
		//REQUIRED: params.port
		//REQUIRED: connectionListenerOrListeners

		var
		// host
		host = params.host,

		// port
		port = params.port,

		// connection listener
		connectionListener,

		// error listener
		errorListener,

		// net
		net = require('net'),

		// connection
		conn,

		// is connected
		isConnected,

		// method map
		methodMap = {},

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
		runMethods;

		if (CHECK_IS_DATA(connectionListenerOrListeners) !== true) {
			connectionListener = connectionListenerOrListeners;
		} else {
			connectionListener = connectionListenerOrListeners.success;
			errorListener = connectionListenerOrListeners.error;
		}

		runMethods = function(methodName, data) {

			var
			// methods
			methods = methodMap[methodName];

			if (methods !== undefined) {

				EACH(methods, function(method) {

					// run method.
					method(data,

					// ret.
					function(retData) {

						if (send !== undefined) {

							send({
								methodName : '__CALLBACK_' + methodName,
								data : retData
							});
						}
					});
				});
			}
		};

		conn = net.connect({
			host : host,
			port : port
		}, function() {

			isConnected = true;

			connectionListener(

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
							data : methods,
							value : method
						});

					} else {
						delete methodMap[methodName];
					}
				}
			},

			// send to server.
			send = function(params, callback) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data
				//OPTIONAL: callback

				var
				// method name
				methodName = params.methodName;

				conn.write(STRINGIFY(params) + '\n');

				if (callback !== undefined) {

					// on callback.
					on('__CALLBACK_' + methodName, function(data) {

						// run callback.
						callback(data);

						// off callback.
						off('__CALLBACK_' + methodName);
					});
				}
			},

			// disconnect.
			function() {

				isForceDisconnecting = true;

				conn.end();
			});
		});

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
					runMethods(params.methodName, params.data);
				}

				receivedStr = receivedStr.substring(index + 1);
			}
		});

		// when disconnected
		conn.on('close', function() {

			if (isForceDisconnecting !== true) {
				runMethods('__DISCONNECTED');
			}
		});

		// when error
		conn.on('error', function(error) {

			var
			// error msg
			errorMsg = error.toString();

			if (isConnected !== true) {

				console.log(CONSOLE_RED('[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: ' + errorMsg));

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				}

			} else {
				runMethods('__ERROR', errorMsg);
			}
		});
	}
});
