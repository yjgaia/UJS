/**
 * Low event class
 */
global.EVENT_LOW = EVENT_LOW = CLASS({

	init : function(inner, self, nameOrParams, func) {
		'use strict';
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.lowNode
		//REQUIRED: nameOrParams.name
		//REQUIRED: func

		var
		// node
		node,

		// low node
		lowNode,

		// name
		name,

		// el
		el,

		// inner func.
		innerFunc,

		// remove.
		remove;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			lowNode = nameOrParams.lowNode;
			name = nameOrParams.name;

			if (lowNode === undefined) {
				lowNode = node;
			}
		}

		if (lowNode !== undefined) {
			el = lowNode.getWrapperEl();
		} else if (global['on' + name] === undefined) {
			el = document;
		} else {
			el = global;
		}

		inner.innerFunc = innerFunc = function(e) {
			//REQUIRED: e

			return func(E({
				e : e,
				el : el
			}), node);
		};

		el.addEventListener(name, innerFunc, false);

		self.remove = remove = function() {
			el.removeEventListener(name, innerFunc, false);
		};
	}
});
