// test PUT request.
PUT({
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test PUT request with parameters.
PUT({
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test PUT request with data.
PUT({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test PUT request.
PUT({
	uri : 'AJAX_JSON_TEST'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test PUT request with parameters.
PUT({
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test PUT request with data.
PUT({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(PARSE_STR(content));
});
