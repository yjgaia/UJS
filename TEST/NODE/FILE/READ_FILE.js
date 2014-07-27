// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

READ_FILE('test', {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	notExists : function() {
		console.log('NOT EXISTS!');
	},

	success : function(content) {
		console.log(content);
	}
});
