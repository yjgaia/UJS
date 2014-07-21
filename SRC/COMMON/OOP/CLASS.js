/**
 * Create class.
 */
global.CLASS = CLASS = METHOD(function(m) {'use strict';

	var
	// instance count
	instanceCount = 0,

	// get instance id.
	getInstanceId;

	m.getInstanceId = getInstanceId = function() {

		instanceCount += 1;

		return instanceCount - 1;
	};

	return {

		run : function(define) {
			//REQUIRED: define

			var
			// funcs
			funcs,

			// preset.
			preset,

			// init.
			init,

			// params.
			_params,

			// cls.
			cls = function(params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// inner (like Java's protected.)
				inner = {},

				// self (like Java's public.)
				self = {};

				self.type = cls;

				self.id = getInstanceId();

				// run inner init.
				innerInit(inner, self, params, funcs);

				return self;
			},

			// inner init.
			innerInit;

			cls.type = CLASS;

			cls.innerInit = innerInit = function(inner, self, params, funcs) {
				//OPTIONAL: params
				//OPTIONAL: funcs

				var
				// mom (parent class)
				mom,

				// temp params
				tempParams,

				// param value
				paramValue;

				if (_params !== undefined) {

					// when params is undefined
					if (params === undefined) {
						params = _params(cls);
					}

					// when params is data
					else if (CHECK_IS_DATA(params) === true) {

						tempParams = _params(cls);

						if (tempParams !== undefined) {

							EXTEND_DATA({
								origin : tempParams,
								extend : params
							});

							params = tempParams;
						}
					}

					// when params is value
					else {
						paramValue = params;
						params = _params();
					}
				}

				if (preset !== undefined) {

					mom = preset(params, funcs);

					if (mom !== undefined) {

						cls.mom = mom;

						// when mom's type is CLASS
						if (mom.type === CLASS) {
							mom.innerInit(inner, self, params, funcs);
						}

						// when mon's type is OBJECT
						else {
							mom.type.innerInit(inner, self, params, funcs);
						}
					}
				}

				if (init !== undefined) {
					init(inner, self, paramValue === undefined ? params : paramValue, funcs);
				}
			};

			// when define is function
			if ( typeof define === 'function') {
				funcs = define(cls);
			}

			// when define is function set
			else {
				funcs = define;
			}

			// init funcs.
			if (funcs !== undefined) {
				preset = funcs.preset;
				init = funcs.init;
				_params = funcs.params;
			}

			return cls;
		}
	};
});
