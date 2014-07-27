// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

SOCKET_SERVER(8124, function(clientInfo, on, off, send, disconnect) {

	var
	// roles
	roles = [];

	console.log('CONNECTED!', clientInfo);

	on('message', function(data, ret) {

		console.log('SERVER!', data);

		ret('Thanks!');
	});

	send({
		methodName : 'message',
		data : {
			msg : 'message from server.'
		}
	}, function(retMsg) {

		console.log('RETURN MESSAGE:', retMsg);
	});

	send({
		methodName : 'message',
		data : {
			msg : 'second message from server.'
		}
	});

	on('login', function(data) {
		if (data.username === 'test' && data.password === '1234') {
			roles.push('USER');
		}
	});

	on('checkRole', function(role) {

		if (CHECK_IS_EXISTS({
			data : roles,
			value : role
		}) === true) {

			console.log('SINGED!', role);
		}
	});

	// when disconnected
	on('__DISCONNECTED', function() {
		console.log('DISCONNECTED!');
	});
});
