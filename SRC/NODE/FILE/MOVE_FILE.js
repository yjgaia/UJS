/*
 * move file.
 */
global.MOVE_FILE = METHOD({

	run : function(params, callbackOrHandlers) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.from
		//REQUIRED: params.to
		//OPTIONAL: params.isSync
		//REQUIRED: callbackOrHandlers
		//REQUIRED: callbackOrHandlers.success
		//OPTIONAL: callbackOrHandlers.notExistsHandler
		//OPTIONAL: callbackOrHandlers.error

		var
		// from
		from = params.from,

		// is sync
		isSync = params.isSync,

		// callback.
		callback,

		// not exists handler.
		notExistsHandler,

		// error handler.
		errorHandler;

		if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
			callback = callbackOrHandlers;
		} else {
			callback = callbackOrHandlers.success;
			notExistsHandler = callbackOrHandlers.notExists;
			errorHandler = callbackOrHandlers.error;
		}

		COPY_FILE(params, {
			error : errorHandler,
			notExists : notExistsHandler,
			success : function() {

				REMOVE_FILE({
					path : from,
					isSync : isSync
				}, {
					error : errorHandler,
					notExists : notExistsHandler,
					success : callback
				});
			}
		});
	}
});
