/**
 * document ready.
 */
global.READY = READY = METHOD(function(m) {
	'use strict';

	var
	// ready count
	readyCount = 0,

	// handler.
	handler,

	// ready load.
	readyLoad,

	// loaded.
	loaded;

	m.readyLoad = readyLoad = function() {
		readyCount += 1;
	};

	m.loaded = loaded = function() {

		readyCount -= 1;

		if (handler !== undefined && readyCount === 0) {
			handler();
			handler = undefined;
		}
	};

	return {

		run : function(_handler) {
			//REQUIRED: _handler

			handler = _handler;

			global.onload = function() {

				if (handler !== undefined && readyCount === 0) {
					handler();
					handler = undefined;
				}
			};
		}
	};
});
