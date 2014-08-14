/*
 * copy file.
 */
global.COPY_FILE = COPY_FILE = METHOD(function() {
	'use strict';

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
			//OPTIONAL: params.isSync
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// src path
			srcPath = params.srcPath,

			// dist path
			distPath = params.distPath,

			// is sync
			isSync = params.isSync,

			// callback.
			callback,

			// error handler.
			errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}

			CREATE_FOLDER({
				path : _path.dirname(distPath),
				isSync : isSync
			}, {

				error : errorHandler,

				success : function() {

					// when normal mode
					if (isSync !== true) {

						RUN(function() {

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
								if (callback !== undefined) {
									callback();
								}
							});
						});
					}

					// when sync mode
					else {

						RUN(function() {

							var
							// error msg
							errorMsg;

							try {

								fs.writeFileSync(distPath, fs.readFileSync(srcPath));

								if (callback !== undefined) {
									callback();
								}

							} catch(error) {

								if (error !== TO_DELETE) {

									errorMsg = error.toString();

									console.log(CONSOLE_RED('[UPPERCASE.JS-COPY_FILE] ERROR: ' + errorMsg));

									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									}
								}
							}
						});
					}
				}
			});
		}
	};
});
