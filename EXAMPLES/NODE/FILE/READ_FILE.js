// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

var content = READ_FILE({
	path : 'test.txt',
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	notExists : function() {
		console.log('NOT EXISTS!');
	},

	success : function(content) {
		console.log(content.toString());
	}
});

console.log(content.toString());

READ_FILE('test.txt', {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	notExists : function() {
		console.log('NOT EXISTS!');
	},

	success : function(content) {
		console.log(content.toString());
	}
});
