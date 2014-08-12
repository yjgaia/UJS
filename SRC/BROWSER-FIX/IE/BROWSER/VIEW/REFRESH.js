OVERRIDE(REFRESH, function(origin) {
	'use strict';

	/**
	 * refresh view. (fix for IE)
	 */
	global.REFRESH = REFRESH = METHOD({

		run : function(uri) {
			//OPTIONAL: uri

			var
			// saved hash
			savedHash = uri !== undefined ? '#' + uri : location.hash;

			EVENT_ONCE({
				name : 'hashchange'
			}, function() {
				DELAY(function() {
					location.href = savedHash === '' ? '#' : savedHash;
				});
			});

			location.href = '#__REFRESING';
		}
	});
});
