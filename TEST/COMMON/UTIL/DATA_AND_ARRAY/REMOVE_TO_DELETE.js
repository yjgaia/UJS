TEST('REMOVE_TO_DELETE', function(ok) {
	'use strict';

	var
	// data
	data = {
		a : 1,
		b : TO_DELETE,
		c : 3
	},

	// array
	array = [3, TO_DELETE, 1];

	REMOVE_TO_DELETE(data);

	ok(CHECK_ARE_SAME([data, {
		a : 1,
		c : 3
	}]) === true);

	REMOVE_TO_DELETE(array);

	ok(CHECK_ARE_SAME([array, [3, 1]]) === true);
});
