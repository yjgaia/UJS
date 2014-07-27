// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

RESOURCE_SERVER({
	port : 8123,
	rootPath : __dirname + '/R'
});
