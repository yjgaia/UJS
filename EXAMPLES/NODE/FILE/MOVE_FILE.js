// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('MOVE_FILE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	MOVE_FILE({
		from : 'test2.txt',
		to : 'testFolder/test2.txt',
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
		from : 'test3.txt',
		to : 'testFolder/test3.txt'
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
