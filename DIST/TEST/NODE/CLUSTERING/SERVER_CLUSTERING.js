// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

SERVER_CLUSTERING({
	hosts : ['192.168.206.1', '192.168.114.1'],
	port : 8125
}, function(thisServerHost, on, off, broadcast) {

	on('receive', function(data) {
		console.log('SERVER_CLUSTERING received: ', data);
	});

	DELAY(1, function() {

		broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	});
});
