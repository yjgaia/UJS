/**
 * document ready.
 */
global.READY = READY = METHOD(function(m) {
	'use strict';

	var
	// ready count
	readyCount = 0,

	// is loaded
	isLoaded,

	// handlers
	handlers = [],

	// ready load.
	readyLoad,

	// loaded.
	loaded;

	m.readyLoad = readyLoad = function() {
		readyCount += 1;
	};

	m.loaded = loaded = function() {

		readyCount -= 1;

		if (isLoaded === true && handlers !== undefined && readyCount === 0) {

			EACH(handlers, function(handler) {
				handler();
			});

			handlers = undefined;
		}
	};

	global.onload = function() {

		isLoaded = true;

		if (handlers !== undefined && readyCount === 0) {

			EACH(handlers, function(handler) {
				handler();
			});

			handlers = undefined;
		}
	};

	return {

		run : function(handler) {
			//REQUIRED: handler

			if (handlers !== undefined) {
				handlers.push(handler);
			} else {
				handler();
			}
		}
	};
});
