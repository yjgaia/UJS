/**
 * Create object.
 */
global.OBJECT = OBJECT = METHOD(function(m) {
	'use strict';

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
		// cls
		cls = object.type,

		// inner (like Java's protected.)
		inner = {},

		// params
		params = {};

		// set id.
		object.id = CLASS.getInstanceId();

		// run inner init.
		cls.innerInit(inner, object, params);

		// run inner after init.
		cls.innerAfterInit(inner, object, params);
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
