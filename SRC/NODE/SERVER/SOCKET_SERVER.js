/*
 * create socket server.
 */
global.SOCKET_SERVER = SOCKET_SERVER = METHOD({

	run : function(port, connectionListener) {'use strict';
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

							send({
								methodName : '__CALLBACK_' + methodName,
								data : retData
							});
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

				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', function(error) {
				runMethods('__ERROR', error);
			});

			connectionListener(

			// info
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
							data : methods,
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

		// listen.
		server.listen(port);

		console.log('[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:' + port + ')');
	}
});
