// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('CPU_CLUSTERING', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function(workerData, on, off, broadcast) {

		console.log('WORK, WORKER!: ', workerData.id, workerData.pid);

		on('receive', function(data) {
			ok(CHECK_ARE_SAME([data, {
				msg : 'Hey!'
			}]));
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
});
