/**
 * View interface
 */
global.VIEW = VIEW = CLASS({

	init : function(inner, self) {'use strict';

		var
		// on params change.
		onParamsChange,

		// close.
		close;

		self.onParamsChange = onParamsChange = function(params) {
			//REQUIRED: params

			// to implement.
		};

		self.close = close = function() {
			// to implement.
		};
	}
});
