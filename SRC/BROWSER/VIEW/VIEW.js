/**
 * View interface
 */
global.VIEW = VIEW = CLASS({

	init : function(inner, self) {'use strict';

		var
		// on change params.
		onChangeParams,

		// close.
		close;

		self.onChangeParams = onChangeParams = function(params) {
			//REQUIRED: params

			// to implement.
		};

		self.close = close = function() {
			// to implement.
		};
	}
});
