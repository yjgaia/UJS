// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('SHA1', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// generate SHA-1 hash.
	ok(SHA1({
		key : 'test',
		password : '1234'
	}) === '16dd1fdd7c595eab4586cebba6b34eaff41acc53');
});
