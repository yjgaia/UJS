/*
 * copy file.
 */
global.COPY_FILE = COPY_FILE = METHOD(function() {'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//REQUIRED: params.srcPath
			//REQUIRED: params.distPath
			//REQUIRED: callbackOrHandlers
			//REQUIRED: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// src path
			srcPath = params.srcPath,

			// dist path
			distPath = params.distPath,

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

			CREATE_FOLDER(_path.dirname(distPath), function() {

				var
				// reader
				reader = fs.createReadStream(srcPath);

				reader.pipe(fs.createWriteStream(distPath));

				reader.on('error', function(error) {

					var
					// error msg
					errorMsg = error.toString();

					console.log(CONSOLE_RED('[UPPERCASE.JS-COPY_FILE] ERROR:' + errorMsg));

					if (errorHandler !== undefined) {
						errorHandler(errorMsg);
					}
				});

				reader.on('end', function() {
					callback();
				});
			});
		}
	};
});
