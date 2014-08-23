// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

TEST('SERVER_CLUSTERING', function(ok) {
	'use strict';

	INIT_OBJECTS();

	SERVER_CLUSTERING({
		hosts : ['1.226.84.92', '58.229.105.35'],
		thisServerHost : '1.226.84.92',
		port : 9125
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
});
