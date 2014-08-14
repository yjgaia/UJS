// load UPPERCASE.JS
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-PHANTOM.js');

WEB_SERVER(8812, function(req, response) {

	response({
		content : 'Welcome to UPPERCASE.JS web server! (PhantomJS)'
	});
});
