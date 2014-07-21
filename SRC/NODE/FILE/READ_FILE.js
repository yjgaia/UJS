/*
 * read file.
 */
global.READ_FILE = READ_FILE = METHOD(function() {'use strict';

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

					fs.stat(path, function(error, stat) {

						var
						// error msg
						errorMsg;

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							console.log(CONSOLE_RED('[UPPERCASE.JS-READ_FILE] ERROR: ' + errorMsg));

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}

						} else if (stat.isDirectory() === true) {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							}

						} else {

							fs.readFile(path, function(error, content) {

								var
								// error msg
								errorMsg;

								if (error !== TO_DELETE) {

									errorMsg = error.toString();

									console.log(CONSOLE_RED('[UPPERCASE.JS-READ_FILE] ERROR: ' + errorMsg));

									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									}

								} else {
									callback(content);
								}
							});
						}
					});

				} else if (notExistsHandler !== undefined) {
					notExistsHandler(path);
				}
			});
		}
	};
});
