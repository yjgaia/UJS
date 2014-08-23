// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('RESOURCE_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// if you don't want resource caching.
	CONFIG.isDevMode = true;

	RESOURCE_SERVER({
		port : 8123,
		rootPath : __dirname + '/R'
	});
});
