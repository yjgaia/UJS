// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

CPU_CLUSTERING(function(workerData, on, off, broadcast) {

	var
	// shared store
	sharedStore = CPU_SHARED_STORE('test');

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
