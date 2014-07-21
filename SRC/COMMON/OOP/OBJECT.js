/**
 * Create object.
 */
global.OBJECT = OBJECT = METHOD(function(m) {'use strict';

	var
	// readys
	readys = [],

	// is inited
	isInited = false,

	// add ready.
	addReady = function(func) {
		//REQUIRED: func

		if (isInited === true) {
			func();
		} else {
			readys.push(func);
		}
	},

	// init objects.
	initObjects;

	m.initObjects = initObjects = function() {

		EACH(readys, function(ready, i) {
			ready();
		});

		isInited = true;
	};

	return {

		run : function(define) {
			//REQUIRED: define

			var
			// cls
			cls = CLASS(define),

			// self
			self = {};

			self.type = cls;

			addReady(function() {

				var
				// inner (like Java's protected.)
				inner = {};

				self.id = CLASS.getInstanceId();

				cls.innerInit(inner, self);
			});

			return self;
		}
	};
});
