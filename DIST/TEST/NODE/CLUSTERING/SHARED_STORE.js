// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

CPU_CLUSTERING(function(workerData, on, off, broadcast) {

	SERVER_CLUSTERING({
		hosts : ['192.168.206.1', '192.168.114.1'],
		port : 8125
	}, function(thisServerHost, on, off, broadcast) {

		var
		// shared store
		sharedStore = SHARED_STORE('test');

		if (workerData.id === 1) {

			sharedStore.save({
				key : 'msg',
				value : 'Hello World!'
			});
		}

		DELAY(1, function() {
			console.log(sharedStore.get('msg'));
		});
	});
});
