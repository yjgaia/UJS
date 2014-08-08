// test with one parameter method.
RUN(function() {

	var
	// method
	method = METHOD(function(m) {

		var
		// static value
		staticText = 'static text.',

		// get static text.
		getStaticText;

		m.getStaticText = getStaticText = function() {
			return staticText;
		};

		return {
			run : function(value) {
				console.log(value);
			}
		};
	});

	// run.
	method('this is value.');

	// check is method.
	console.log('is this method?: ' + (method.type === METHOD));

	// static value
	console.log(method.getStaticText());
});

// test with multiple parameters method.
RUN(function() {

	var
	// method
	method = METHOD({
		run : function(params) {
			console.log('name: ' + params.name + ', age: ' + params.age);
		}
	});

	// run.
	method({
		name : 'Hanul',
		age : 27
	});
});

// test with one function method.
RUN(function() {

	var
	// method
	method = METHOD({
		run : function(func) {
			func('ok');
		}
	});

	// run!
	method(function(msg) {
		console.log(msg);
	});
});

// test with multiple functions method.
RUN(function() {

	var
	// method
	method = METHOD({
		run : function(funcs) {
			funcs.f1('ok');
			funcs.f2('ok');
		}
	});

	// run.
	method({
		f1 : function(msg) {
			console.log('f1: ' + msg);
		},
		f2 : function(msg) {
			console.log('f2: ' + msg);
		}
	});
});

// test with complex method.
RUN(function() {

	var
	// method
	method = METHOD({
		run : function(params, funcs) {
			funcs.f1(params.age);
		}
	});

	// run.
	method({
		name : 'Hanul',
		age : 27
	}, {
		f1 : function(msg) {
			console.log('f1: ' + msg);
		},
		f2 : function(msg) {
			console.log('f2: ' + msg);
		}
	});
});
