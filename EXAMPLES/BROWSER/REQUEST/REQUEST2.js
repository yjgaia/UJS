TEST('REQUEST', function(ok) {
	'use strict';

	// test request.
	REQUEST({
		method : 'GET',
		uri : 'AJAX_TEST',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request(GET) with parameters.
	REQUEST({
		method : 'GET',
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request(POST) with parameters.
	REQUEST({
		method : 'POST',
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request with data.
	REQUEST({
		method : 'POST',
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		},
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request.
	GET({
		uri : 'AJAX_JSON_TEST',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request(GET) with parameters.
	REQUEST({
		method : 'GET',
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request(POST) with parameters.
	REQUEST({
		method : 'POST',
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request with data.
	POST({
		uri : 'AJAX_JSON_TEST',
		data : {
			thisis : 'data'
		},
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
