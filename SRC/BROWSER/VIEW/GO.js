/**
 * go another view.
 */
global.GO = METHOD({

	run : function(uri) {
		'use strict';
		//REQUIRED: uri

		history.pushState(undefined, undefined, HREF(uri));
		
		MATCH_VIEW.checkAll();
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.GO = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
