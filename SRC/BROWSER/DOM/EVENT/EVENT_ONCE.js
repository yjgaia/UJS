/**
 * Event once class
 */
global.EVENT_ONCE = EVENT_ONCE = CLASS({

	init : function(inner, self, params, func) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.node
		//REQUIRED: params.name
		//REQUIRED: func

		var
		// evt
		evt = EVENT(params, function(e, node) {
			func(e, node);
			evt.remove();
		}),

		// remove.
		remove,

		// fire.
		fire;

		self.remove = remove = function() {
			evt.remove();
		};

		self.fire = fire = function() {
			evt.fire();
		};
	}
});
