TEST('LOADING_BAR', function(ok) {
	'use strict';

	var
	// bar
	bar = LOADING_BAR();

	// bar done 2 seconds.
	DELAY(2, function() {
		bar.done();
	});
});
