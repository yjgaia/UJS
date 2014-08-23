// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('COPY_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	COPY_FILE({
		srcPath : 'test.txt',
		distPath : 'test2.txt',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		}
	});

	ok(READ_FILE({
		path : 'test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	COPY_FILE({
		srcPath : 'test.txt',
		distPath : 'test3.txt'
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			ok(READ_FILE({
				path : 'test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
