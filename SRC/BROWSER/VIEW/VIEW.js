/**
 * View interface
 */
global.VIEW = VIEW = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// is closed
		isClosed,

		// params change handlers
		paramsChangeHandlers = [],

		// close handlers
		closeHandlers = [],

		// on.
		on,

		// change params.
		changeParams,

		// close.
		close,

		// check is closed.
		checkIsClosed;

		inner.on = on = function(methodName, handler) {
			//REQUIRED: methodName

			// when change params
			if (methodName === 'paramsChange') {
				paramsChangeHandlers.push(handler);
			}

			// when close
			else if (methodName === 'close') {
				closeHandlers.push(handler);
			}
		};

		self.changeParams = changeParams = function(params) {

			EACH(paramsChangeHandlers, function(handler) {
				handler(params);
			});
		};

		self.close = close = function() {

			EACH(closeHandlers, function(handler) {
				handler();
			});

			isClosed = true;
		};

		inner.checkIsClosed = checkIsClosed = function() {
			return isClosed;
		};
	}
});
