// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

// generate SHA-1 hash.
console.log(SHA1({
	key : 'test',
	password : '1234'
}));
