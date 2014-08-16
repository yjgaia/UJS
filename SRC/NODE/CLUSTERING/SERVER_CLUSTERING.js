/*
 * server clustering work.
 */
global.SERVER_CLUSTERING = SERVER_CLUSTERING = METHOD(function(m) {
	'use strict';

	return {

		run : function(params, work) {
			//REQUIRED: params
			//REQUIRED: params.hosts
			//REQUIRED: params.thisServerHost
			//REQUIRED: params.port
			//OPTIONAL: work

			var
			// hosts
			hosts = params.hosts,

			// this server host
			thisServerHost = params.thisServerHost,

			// port
			port = params.port,

			// method map
			methodMap = {},

			// is connectings
			isConnectings = {},

			// server sends
			serverSends = {},

			// connect to clustering server.
			connectToClusteringServer,

			// run methods.
			runMethods = function(methodName, data) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods !== undefined) {

					EACH(methods, function(method) {

						// run method.
						method(data);
					});
				}
			},

			// socket server ons
			socketServeOns = [],

			// on.
			on,

			// off.
			off,

			// broadcast.
			broadcast;

			connectToClusteringServer = function(host) {

				if (isConnectings[host] !== true) {
					isConnectings[host] = true;

					CONNECT_TO_SOCKET_SERVER({
						host : host,
						port : port
					}, {
						error : function() {
							delete isConnectings[host];
						},

						success : function(on, off, send) {

							send({
								methodName : '__BOOTED',
								data : thisServerHost
							});

							serverSends[host] = function(params) {
								//REQUIRED: params
								//REQUIRED: params.methodName
								//REQUIRED: params.data

								var
								// method name
								methodName = params.methodName,

								// data
								data = params.data;

								send({
									methodName : 'SERVER_CLUSTERING.' + methodName,
									data : data
								});
							};

							on('__DISCONNECTED', function() {
								delete serverSends[host];
								delete isConnectings[host];
							});

							console.log('[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:' + host + ')');

							if (CPU_CLUSTERING.broadcast !== undefined) {

								CPU_CLUSTERING.broadcast({
									methodName : '__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER',
									data : host
								});
							}
						}
					});
				}
			};

			if (CPU_CLUSTERING.on !== undefined) {
				CPU_CLUSTERING.on('__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER', connectToClusteringServer);
			}

			// try connect to all clustering servers.
			EACH(hosts, function(host) {
				if (host !== thisServerHost) {
					connectToClusteringServer(host);
				}
			});

			SOCKET_SERVER(port, function(clientInfo, socketServeOn) {

				socketServeOns.push(socketServeOn);

				socketServeOn('__BOOTED', function(host) {
					connectToClusteringServer(host);
				});

				EACH(methodMap, function(methods, methodName) {
					EACH(methods, function(method) {
						socketServeOn('SERVER_CLUSTERING.' + methodName, method);
					});
				});

				socketServeOn('__DISCONNECTED', function() {
					REMOVE({
						array : socketServeOns,
						value : socketServeOn
					});
				});
			});

			m.on = on = function(methodName, method) {

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);

				EACH(socketServeOns, function(socketServeOn) {
					socketServeOn('SERVER_CLUSTERING.' + methodName, method);
				});
			};

			// save shared value.
			on('__SHARED_STORE_SAVE', function(params) {

				SHARED_STORE.save(params);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_SAVE',
						data : params
					});
				}
			});

			// remove shared value.
			on('__SHARED_STORE_REMOVE', function(fullKey) {

				SHARED_STORE.remove(fullKey);

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__SHARED_STORE_REMOVE',
						data : fullKey
					});
				}
			});

			m.off = off = function(methodName) {
				delete methodMap[methodName];
			};

			m.broadcast = broadcast = function(params) {
				//REQUIRED: params
				//REQUIRED: params.methodName
				//REQUIRED: params.data

				EACH(serverSends, function(serverSend) {
					serverSend(params);
				});
			};

			if (work !== undefined) {

				work(thisServerHost,

				// on.
				on,

				// off.
				off,

				// broadcast.
				broadcast);
			}

			console.log(CONSOLE_BLUE('[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:' + thisServerHost + ', PORT:' + port + ')'));
		}
	};
});
