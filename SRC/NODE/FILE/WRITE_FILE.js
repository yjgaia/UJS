/*
 * write file.
 */
global.WRITE_FILE = WRITE_FILE = METHOD(function() {'use strict';

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
			//REQUIRED: callbackOrHandlers
			//REQUIRED: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// path
			path = params.path,

			// content
			content = params.content,

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

			NEXT([
			function(next) {

				var
				// f.
				f = function(path, next) {

					fs.exists(path, function(isExists) {

						var
						// folder path
						folderPath;

						if (isExists === true) {
							next();
						} else {

							folderPath = _path.dirname(path);

							fs.exists(folderPath, function(isExists) {

								if (isExists === true) {
									fs.mkdir(path, next);
								} else {

									f(folderPath, function() {

										// retry.
										f(path, next);
									});
								}
							});
						}
					});
				};

				f(_path.dirname(path), next);
			},

			function() {
				return function(t) {

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

						} else {
							callback();
						}
					});
				};
			}]);
		}
	};
});
