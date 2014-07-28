/**
 * Create object.
 */
global.OBJECT = OBJECT = METHOD(function(m) {'use strict';

	var
	// ready objects
	readyObjects = [],

	// is inited
	isInited = false,

	// init object.
	initObject,

	// add ready object.
	addReadyObject,

	// remove ready object.
	removeReadyObject,

	// init objects.
	initObjects;

	initObject = function(object) {

		var
		// inner (like Java's protected.)
		inner = {};

		// set id.
		object.id = CLASS.getInstanceId();

		object.type.innerInit(inner, object, {}, {});
	};

	addReadyObject = function(object) {
		//REQUIRED: object

		if (isInited === true) {
			initObject(object);
		} else {
			readyObjects.push(object);
		}
	};

	m.removeReadyObject = removeReadyObject = function(object) {
		REMOVE({
			data : readyObjects,
			value : object
		});
	};

	m.initObjects = initObjects = function() {

		EACH(readyObjects, function(object) {
			initObject(object);
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

			// set type.
			self.type = cls;

			// check is instance of.
			self.checkIsInstanceOf = function(checkCls) {

				var
				// target cls
				targetCls = cls;

				// check moms.
				while (targetCls !== undefined) {

					if (targetCls === checkCls) {
						return true;
					}

					targetCls = targetCls.mom;
				}

				return false;
			};

			addReadyObject(self);

			return self;
		}
	};
});
