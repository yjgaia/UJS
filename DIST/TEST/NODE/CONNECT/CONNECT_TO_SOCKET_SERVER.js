// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

// if you not want error listener.
//
//	CONNECT_TO_SOCKET_SERVER({
//		port : 8124
//	}, function(on, off, send) {
//		...
//	});

CONNECT_TO_SOCKET_SERVER({
	port : 8124
}, {
	error : function(error) {
		console.log('ERROR!');
	},
	success : function(on, off, send, disconnect) {

		on('message', function(data, ret) {

			console.log('CLIENT!', data);

			ret('Thanks!');
		});

		send({
			methodName : 'message',
			data : {
				msg : 'message from client.'
			}
		}, function(retMsg) {

			console.log('RETURN MESSAGE:', retMsg);
		});

		send({
			methodName : 'message',
			data : {
				msg : 'second message from client.'
			}
		});

		send({
			methodName : 'login',
			data : {
				username : 'test',
				password : '1234'
			}
		});

		DELAY(1, function() {

			send({
				methodName : 'checkRole',
				data : 'USER'
			});
		});

		// when disconnected
		on('__DISCONNECTED', function() {
			console.log('DISCONNECTED!');
		});
	}
});
