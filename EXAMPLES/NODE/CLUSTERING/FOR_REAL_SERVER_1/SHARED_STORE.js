// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

TEST('SHARED_STORE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function(workerData, on, off, broadcast) {

		SERVER_CLUSTERING({
			hosts : ['1.226.84.92', '58.229.105.35'],
			thisServerHost : '1.226.84.92',
			port : 9125
		}, function(thisServerHost, on, off, broadcast) {

			var
			// shared store
			sharedStore = SHARED_STORE('test');

			INTERVAL(1, function() {
				console.log(sharedStore.get('msg'));
			});

			if (workerData.id === 1) {

				if (thisServerHost === '58.229.105.35') {

					DELAY(1, function() {
						sharedStore.save({
							name : 'msg',
							value : 'Hello SERVER_CLUSTERING!'
						});
					});

				} else {

					DELAY(5, function() {
						sharedStore.save({
							name : 'msg',
							value : 'Hello SERVER_CLUSTERING2!',
							removeAfterSeconds : 5
						});
					});
				}
			}
		});
	});
});
