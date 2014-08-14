// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

REMOVE_FILE({
	path : 'test2.txt',
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});

REMOVE_FILE('test3.txt', {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function() {
		console.log('good!');
	}
});
