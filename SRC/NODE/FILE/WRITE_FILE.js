/*
 * write file.
 */
global.WRITE_FILE = WRITE_FILE = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//REQUIRED: params.path
			//REQUIRED: params.content
			//OPTIONAL: params.isSync
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// path
			path = params.path,

			// content
			content = params.content,

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
				path : _path.dirname(path),
				isSync : isSync
			}, function() {

				// when normal mode
				if (isSync !== true) {

					fs.writeFile(path, content, function(error) {

						var
						// error msg
						errorMsg;

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							console.log(CONSOLE_RED('[UPPERCASE.JS-WRITE_FILE] ERROR:' + errorMsg));

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}

						} else if (callback !== undefined) {
							callback();
						}
					});
				}

				// when sync mode
				else {

					RUN(function() {

						var
						// error msg
						errorMsg;

						try {

							fs.writeFileSync(path, content);

							if (callback !== undefined) {
								callback();
							}

						} catch(error) {

							if (error !== TO_DELETE) {

								errorMsg = error.toString();

								console.log(CONSOLE_RED('[UPPERCASE.JS-WRITE_FILE] ERROR: ' + errorMsg));

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								}
							}
						}
					});
				}
			});
		}
	};
});
