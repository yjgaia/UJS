/*
 * move file.
 */
global.MOVE_FILE = MOVE_FILE = METHOD({

	run : function(params, callbackOrHandlers) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.srcPath
		//REQUIRED: params.distPath
		//OPTIONAL: params.isSync
		//REQUIRED: callbackOrHandlers
		//REQUIRED: callbackOrHandlers.success
		//OPTIONAL: callbackOrHandlers.error

		var
		// src path
		srcPath = params.srcPath,

		// is sync
		isSync = params.isSync,

		// callback.
		callback,

		// error handler.
		errorHandler;

		if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
			callback = callbackOrHandlers;
		} else {
			callback = callbackOrHandlers.success;
			errorHandler = callbackOrHandlers.error;
		}

		COPY_FILE(params, {
			error : errorHandler,
			success : function() {

				REMOVE_FILE({
					path : srcPath,
					isSync : isSync
				}, {
					error : errorHandler,
					success : callback
				});
			}
		});
	}
});
