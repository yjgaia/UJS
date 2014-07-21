// test POST request.
POST({
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test POST request with parameters.
POST({
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test POST request with data.
POST({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test POST request.
POST({
	uri : 'AJAX_JSON_TEST'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test POST request with parameters.
POST({
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test POST request with data.
POST({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(PARSE_STR(content));
});
