NEXT([
function(next) {

	console.log('first');

	DELAY(1, function() {
		next(1);
	});

	NEXT(5, [
	function(i, next) {

		console.log('5 times, ' + i);

		DELAY(0.1, function() {
			next(i + 1);
		});
	},

	function() {
		return function(i) {
			console.log(i + ' times done.');
		};
	}]);
},

function(next) {
	return function(i) {

		console.log('second');

		DELAY(1, function() {
			next(i + 1);
		});

		NEXT(['a', 'b', 'c', 'd', 'e'], [
		function(alphabet, next) {

			console.log('5 alphabets, ' + alphabet);

			DELAY(0.1, function() {
				next(alphabet);
			});
		},

		function() {
			return function(alphabet) {
				console.log('last alphabet is ' + alphabet);
			};
		}]);
	};
},

function() {
	return function(i) {

		console.log('third');

		NEXT([
		function(next) {

			console.log('forth');

			DELAY(1, function() {

				// to sixth.
				next.next(i + 1);
			});
		},

		function(next) {
			return function(i) {

				console.log('fifth');

				DELAY(1, function() {
					next(i + 1);
				});
			};
		},

		function() {
			return function(i) {

				console.log('sixth');

				// i is 3.
				console.log('i:', i);
			};
		}]);
	};
}]);
