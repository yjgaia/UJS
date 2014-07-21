// test request.
REQUEST({
	method : 'GET',
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test request(GET) with parameters.
REQUEST({
	method : 'GET',
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test request(POST) with parameters.
REQUEST({
	method : 'POST',
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test request with data.
REQUEST({
	method : 'POST',
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test request.
REQUEST({
	method : 'GET',
	uri : 'AJAX_JSON_TEST'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test request(GET) with parameters.
REQUEST({
	method : 'GET',
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test request(POST) with parameters.
REQUEST({
	method : 'POST',
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(PARSE_STR(content));
});

// test request with data.
REQUEST({
	method : 'POST',
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(PARSE_STR(content));
});
