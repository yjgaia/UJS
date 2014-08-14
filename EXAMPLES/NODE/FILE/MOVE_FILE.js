// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

MOVE_FILE({
	srcPath : 'test2.txt',
	distPath : 'testaaa/testaaa2.txt',
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});

MOVE_FILE({
	srcPath : 'test3.txt',
	distPath : 'testaaa/testaaa3.txt'
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});
