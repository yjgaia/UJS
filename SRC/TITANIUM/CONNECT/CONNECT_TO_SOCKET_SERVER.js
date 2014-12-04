/*
 * connect to socket server.
 */
global.CONNECT_TO_SOCKET_SERVER = CONNECT_TO_SOCKET_SERVER = METHOD({

	run : function(params, connectionListenerOrListeners) {
		'use strict';
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

		conn = Ti.Network.Socket.createTCP({
			host : host,
			port : port,

			connected : function(e) {

				var
				// socket
				socket = e.socket;

				Ti.Stream.pump(socket, function(e) {

					// when disconnected
					if (e.bytesProcessed < 0) {

						runMethods('__DISCONNECTED');

						conn.close();

						return;
					}

					// when receive data
					else if (e.buffer !== undefined && e.buffer !== TO_DELETE) {

						var
						// str
						str,

						// index
						index,

						// params
						params;

						receivedStr += e.buffer.toString();

						while (( index = receivedStr.indexOf('\r\n')) !== -1) {

							str = receivedStr.substring(0, index);

							params = PARSE_STR(str);

							if (params !== undefined) {
								runMethods(params.methodName, params.data, params.sendKey);
							}

							receivedStr = receivedStr.substring(index + 1);
						}
					}

				}, 1024, true);

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
					callbackName = '__CALLBACK_' + sendKey;

					params.sendKey = sendKey;

					sendKey += 1;

					socket.write(Ti.createBuffer({
						value : STRINGIFY(params) + '\r\n'
					}));

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
					
					runMethods('__DISCONNECTED');
					
					conn.close();
				});
			},

			error : function(e) {

				var
				// error msg
				errorMsg = e.error.toString();

				if (isConnected !== true) {

					if (errorListener !== undefined) {
						errorListener(errorMsg);
					} else {
						console.log('[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: ' + errorMsg);
					}

				} else {
					runMethods('__ERROR', errorMsg);
				}
			}
		});

		conn.connect();
	}
});
