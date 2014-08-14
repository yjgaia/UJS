// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

WRITE_FILE({
	path : 'testFolder/subFolder1/subFolder1/test1',
	content : 'test!!!',
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});

console.log(READ_FILE({
	path : 'testFolder/subFolder1/subFolder1/test1',
	isSync : true
}).toString());

WRITE_FILE({
	path : 'testFolder/subFolder2/subFolder2/test2',
	content : 'test!!!'
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});
