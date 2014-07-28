OVERRIDE(REFRESH, function(origin) {'use strict';

	/**
	 * Refresh.
	 */
	global.REFRESH = REFRESH = METHOD({

		run : function() {

			var
			// saved hash
			savedHash = location.hash;

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
