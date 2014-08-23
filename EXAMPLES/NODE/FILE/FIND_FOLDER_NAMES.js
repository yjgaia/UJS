// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('FIND_FOLDER_NAMES', function(ok) {
	'use strict';

	INIT_OBJECTS();

	ok(CHECK_ARE_SAME([FIND_FOLDER_NAMES({
		folderPath : 'testFolder',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		}
	}), ['subFolder1', 'subFolder2']]));

	FIND_FOLDER_NAMES('testFolder', {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		success : function(fileNames) {
			ok(CHECK_ARE_SAME([fileNames, ['subFolder1', 'subFolder2']]));
		}
	});
});
