// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('MOVE_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	MOVE_FILE({
		srcPath : 'test2.txt',
		distPath : 'testFolder/test2.txt',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		}
	});

	ok(READ_FILE({
		path : 'testFolder/test2.txt',
		isSync : true
	}).toString() === 'this is test file.');

	MOVE_FILE({
		srcPath : 'test3.txt',
		distPath : 'testFolder/test3.txt'
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function() {
			ok(READ_FILE({
				path : 'testFolder/test3.txt',
				isSync : true
			}).toString() === 'this is test file.');
		}
	});
});
