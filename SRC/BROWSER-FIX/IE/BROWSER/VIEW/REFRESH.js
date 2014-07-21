OVERRIDE(REFRESH, function(origin) {'use strict';

	/**
	 * Refresh.
	 */
	global.REFRESH = REFRESH = METHOD({

		run : function() {

			var
			// saved hash
			savedHash = location.hash,

			// hashchange event
			hashchangeEvent = EVENT({
				name : 'hashchange'
			}, function() {

				DELAY(function() {
					location.href = savedHash === '' ? '#' : savedHash;
				});

				hashchangeEvent.remove();
			});

			location.href = '#__REFRESING';
		}
	});
});
