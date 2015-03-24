// load UPPERCASE.JS.
require('../../UPPERCASE.JS-COMMON.js');
require('../../UPPERCASE.JS-NODE.js');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		response('Wellcome!');
	}
});
