/*
 * connect to socket server.
 */
global.CONNECT_TO_SOCKET_SERVER = METHOD({

	run : function(params, connectionListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.host
		//REQUIRED: params.port
		//REQUIRED: connectionListenerOrListeners
		//REQUIRED: connectionListenerOrListeners.success
		//OPTIONAL: connectionListenerOrListeners.error

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

		// send key
		sendKey = 0,

		// received string
		receivedStr = '',

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

						if (send !== undefined && sendKey !== undefined) {

							send({
								methodName : '__CALLBACK_' + sendKey,
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
							array : methods,
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
				// callback name
				callbackName;

				conn.write(STRINGIFY({
					methodName : params.methodName,
					data : params.data,
					sendKey : sendKey
				}) + '\r\n');

				if (callback !== undefined) {
					
					callbackName = '__CALLBACK_' + sendKey;

					// on callback.
					on(callbackName, function(data) {

						// run callback.
						callback(data);

						// off callback.
						off(callbackName);
					});
				}

				sendKey += 1;
			},

			// disconnect.
			function() {
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

			while (( index = receivedStr.indexOf('\r\n')) !== -1) {

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
			runMethods('__DISCONNECTED');
		});

		// when error
		conn.on('error', function(error) {

			var
			// error msg
			errorMsg = error.toString();

			if (isConnected !== true) {

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					console.log(CONSOLE_RED('[UJS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: ' + errorMsg));
				}

			} else {
				runMethods('__ERROR', errorMsg);
			}
		});
	}
});
