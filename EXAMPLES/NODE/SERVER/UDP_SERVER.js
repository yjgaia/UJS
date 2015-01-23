// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('UDP_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function(workerData, on, off, broadcast) {

		UDP_SERVER(8124, function(requestInfo, response) {

			console.log('IP: ' + requestInfo.ip + ', Port: ' + requestInfo.port + ', Content: ' + requestInfo.content);

			response('Welcome to UPPERCASE.JS UDP server! (WORKER #' + workerData.id + ')');
		});
	});
});
