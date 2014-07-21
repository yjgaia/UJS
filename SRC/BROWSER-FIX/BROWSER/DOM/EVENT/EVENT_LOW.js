OVERRIDE(EVENT_LOW, function(origin) {'use strict';

	/**
	 * Low event class (fix.)
	 */
	global.EVENT_LOW = EVENT_LOW = CLASS({

		preset : function(params) {
			//REQUIRED: params
			//OPTIONAL: params.node
			//REQUIRED: params.name

			return origin;
		},

		init : function(inner, self, params, func) {
			//REQUIRED: params
			//OPTIONAL: params.node
			//REQUIRED: params.name
			//REQUIRED: func

			var
			// node
			node = params.node,

			// name
			name = params.name,

			// hash
			hash,

			// hashchange interval
			hashchangeInterval,

			// remove.
			remove;

			// hashchange bug fix.
			if (name === 'hashchange' && global.onhashchange === undefined) {

				hash = location.hash;
				hashchangeInterval = setInterval(function() {
					if (location.hash !== hash) {
						hash = location.hash;
						func(undefined, node);
					}
				}, 100);

				OVERRIDE(self.remove, function(origin) {

					self.remove = remove = function() {
						clearInterval(hashchangeInterval);
					};
				});
			}
		}
	});
});
