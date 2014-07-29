/*
 * remove file.
 */
global.REMOVE_FILE = REMOVE_FILE = METHOD(function() {'use strict';

	var
	//IMPORT: fs
	fs = require('fs');

	return {

		run : function(path, callbackOrHandlers) {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers
			//REQUIRED: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error

			var
			// callback.
			callback,

			// not eixsts handler.
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

			fs.exists(path, function(isExists) {

				if (isExists === true) {

					fs.unlink(path, function(error) {

						var
						// error msg
						errorMsg;

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							console.log(CONSOLE_RED('[UPPERCASE.JS-REMOVE_FILE] ERROR: ' + errorMsg));

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}

						} else {

							if (callback !== undefined) {
								callback();
							}
						}
					});

				} else if (notExistsHandler !== undefined) {
					notExistsHandler(path);
				}
			});
		}
	};
});
