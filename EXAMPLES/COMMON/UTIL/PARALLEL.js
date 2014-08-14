TEST('PARALLEL', function(ok) {
	'use strict';

	var
	// data
	data = {};

	PARALLEL([

	// func1
	function(done) {

		setTimeout(function() {

			data.a = 1;

			done();
		}, 100);
	},

	// func2
	function(done) {

		setTimeout(function() {

			data.b = 2;

			done();
		}, 100);
	},

	// func3
	function(done) {

		setTimeout(function() {

			data.c = 3;

			done();
		}, 100);
	},

	// done
	function() {
		ok(CHECK_ARE_SAME([data, {
			a : 1,
			b : 2,
			c : 3
		}]));
	}]);
});
