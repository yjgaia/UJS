/**
 * refresh view.
 */
global.REFRESH = REFRESH = METHOD(function() {
	'use strict';

	var
	// saved hash
	savedHash;

	EVENT({
		name : 'hashchange'
	}, function() {
		if (savedHash === undefined && location.hash === '#__REFRESING') {
			history.back();
		}
	});

	return {

		run : function(uri) {
			//OPTIONAL: uri

			savedHash = uri !== undefined ? '#' + uri : location.hash;

			EVENT_ONCE({
				name : 'hashchange'
			}, function() {
				location.href = savedHash === '' ? '#' : savedHash;
				savedHash = undefined;
			});

			location.href = '#__REFRESING';
		}
	};
});
