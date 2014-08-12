/**
 * Script class
 */
global.SCRIPT = SCRIPT = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'script'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.src

		var
		// src
		src = params.src;

		inner.setAttr({
			name : 'src',
			value : src
		});
	}
});
