/**
 * Low event class
 */
global.EVENT_LOW = EVENT_LOW = CLASS({

	init : function(inner, self, params, func) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.node
		//REQUIRED: params.name
		//REQUIRED: func

		var
		// node
		node = params.node,

		// name
		name = params.name,

		// el
		el,

		// inner func.
		innerFunc,

		// remove.
		remove;

		if (node !== undefined) {
			el = node.getDom().getEl();
		} else if (global['on' + name] === undefined) {
			el = document;
		} else {
			el = global;
		}

		inner.innerFunc = innerFunc = function(e) {
			//REQUIRED: e

			if (node === undefined) {

				return func(E({
					e : e,
					el : el
				}));

			} else if (node.getDom().getEl() !== undefined) {

				return func(E({
					e : e,
					el : el
				}), node);
			}
		};

		el.addEventListener(name, innerFunc, false);

		self.remove = remove = function() {
			el.removeEventListener(name, innerFunc, false);
		};
	}
});
