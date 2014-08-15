// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

console.log(FIND_FILE({
	folderPath : __dirname,
	isSync : true
}, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	}
}));

FIND_FILE(__dirname, {

	error : function(errorMsg) {
		console.log('ERROR!', errorMsg);
	},

	success : function(fileNames) {
		console.log(fileNames);
	}
});
