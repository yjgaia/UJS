// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

CPU_CLUSTERING(function(workerData, on, off, broadcast) {

	console.log('WORK, WORKER!: ', workerData.id, workerData.pid);

	on('receive', function(data) {
		console.log('WORKER #' + workerData.id + ' received: ', data);
	});

	if (workerData.id === 1) {

		broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	}
});
