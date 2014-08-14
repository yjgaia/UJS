// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

COPY_FILE({
	srcPath : 'test.txt',
	distPath : 'test2.txt',
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});

COPY_FILE({
	srcPath : 'test.txt',
	distPath : 'test3.txt'
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});
