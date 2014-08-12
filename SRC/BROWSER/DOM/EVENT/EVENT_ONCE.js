/**
 * Event once class
 */
global.EVENT_ONCE = EVENT_ONCE = CLASS({

	init : function(inner, self, nameOrParams, func) {
		'use strict';
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//REQUIRED: nameOrParams.name
		//REQUIRED: func

		var
		// evt
		evt = EVENT(nameOrParams, function(e, node) {
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
