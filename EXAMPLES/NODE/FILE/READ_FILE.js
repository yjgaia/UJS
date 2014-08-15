// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

var buffer = READ_FILE({
	path : 'test.txt',
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	notExists : function() {
		console.log('NOT EXISTS!');
	},

	success : function(buffer) {
		console.log(buffer.toString());
	}
});

console.log(buffer.toString());

READ_FILE('test.txt', {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	notExists : function() {
		console.log('NOT EXISTS!');
	},

	success : function(buffer) {
		console.log(buffer.toString());
	}
});
