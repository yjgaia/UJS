// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('DOWNLOAD', function(ok) {
	'use strict';

	INIT_OBJECTS();

	DOWNLOAD({
		url : 'https://github.com/Hanul/UPPERCASE.JS/archive/master.zip',
		path : 'UPPERCASE.JS.zip'
	});
	
	DOWNLOAD({
		host : 'github.com',
		uri : 'Hanul/UPPERCASE.JS/archive/master.zip',
		isSecure : true,
		path : 'UPPERCASE.JS.zip'
	});
});
