// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index.html';
	}
	
	// load UPPERCASE.JS
	else if (uri.substring(0, 'UPPERCASE.JS-'.length) === 'UPPERCASE.JS-') {
		uri = '../../../' + uri;
	}
	
	READ_FILE(uri, {
		
		notExists : function() {
			response(404);
		},
		
		success : function(buffer) {
			response({
				buffer : buffer
			});
		}
	});
});
