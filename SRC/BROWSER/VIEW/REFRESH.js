/**
 * refresh view.
 */
global.REFRESH = REFRESH = METHOD({

	run : function(uri) {
		'use strict';
		//OPTIONAL: uri

		var
		// saved hash
		savedHash = uri !== undefined ? '#' + uri : location.hash;

		EVENT_ONCE({
			name : 'hashchange'
		}, function() {
			location.href = savedHash === '' ? '#' : savedHash;
		});

		location.href = '#__REFRESING';
	}
});
