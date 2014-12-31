/**
 * refresh view.
 */
global.REFRESH = METHOD(function(m) {
	'use strict';
	
	var
	// refreshing uri
	refreshingURI = '__REFRESHING',
	
	// get refreshing uri.
	getRefreshingURI;
	
	m.getRefreshingURI = getRefreshingURI = function() {
		return refreshingURI;
	};
	
	return {

		run : function(uri) {
			//OPTIONAL: uri
	
			var
			// saved uri
			savedURI = uri !== undefined ? uri : location.pathname.substring(1);
	
			history.pushState(undefined, undefined, '/' + refreshingURI);
			MATCH_VIEW.checkAll();
			
			history.pushState(undefined, undefined, '/' + savedURI);
			MATCH_VIEW.checkAll();
		}
	};
});
