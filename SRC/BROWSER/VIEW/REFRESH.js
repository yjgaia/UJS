/**
 * Refresh.
 */
global.REFRESH = REFRESH = METHOD({

	run : function(uri) {'use strict';
		//OPTIONAL: uri

		var
		// saved hash
		savedHash = uri !== undefined ? '#' + uri : location.hash,

		// hashchange event
		hashchangeEvent = EVENT({
			name : 'hashchange'
		}, function() {

			location.href = savedHash === '' ? '#' : savedHash;

			hashchangeEvent.remove();
		});

		location.href = '#__REFRESING';
	}
});
