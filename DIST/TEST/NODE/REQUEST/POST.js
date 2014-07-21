// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

INIT_OBJECTS();

// test POST request.
POST({
	port : 8810,
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test POST request with parameters.
POST({
	port : 8810,
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test POST request with data.
POST({
	port : 8810,
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test POST request.
POST({
	port : 8810,
	uri : 'AJAX_JSON_TEST'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test POST request with parameters.
POST({
	port : 8810,
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test POST request with data.
POST({
	port : 8810,
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(PARSE_STR(content));
});
