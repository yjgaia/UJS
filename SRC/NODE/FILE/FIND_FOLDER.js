/*
 * find folder.
 */
global.FIND_FOLDER = FIND_FOLDER = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(folderPathOrParams, callbackOrHandlers) {
			//REQUIRED: folderPathOrParams
			//REQUIRED: folderPathOrParams.folderPath
			//OPTIONAL: folderPathOrParams.isSync
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// folder path
			folderPath,

			// is sync
			isSync,

			// folder path
			folderPath,

			// callback.
			callback,

			// error handler.
			errorHandler,

			// file names
			fileNames = [];

			// init params.
			if (CHECK_IS_DATA(folderPathOrParams) !== true) {
				folderPath = folderPathOrParams;
			} else {
				folderPath = folderPathOrParams.folderPath;
				isSync = folderPathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}

			// when normal mode
			if (isSync !== true) {

				fs.readdir(folderPath, function(error, names) {

					var
					// error msg
					errorMsg;

					if (error !== TO_DELETE) {

						errorMsg = error.toString();

						console.log(CONSOLE_RED('[UPPERCASE.JS-FIND_FOLDER] ERROR:' + errorMsg));

						if (errorHandler !== undefined) {
							errorHandler(errorMsg);
						}

					} else if (callback !== undefined) {

						PARALLEL(names, [
						function(name, done) {

							fs.stat(folderPath + '/' + name, function(error, stats) {

								var
								// error msg
								errorMsg;

								if (error !== TO_DELETE) {

									errorMsg = error.toString();

									console.log(CONSOLE_RED('[UPPERCASE.JS-FIND_FOLDER] ERROR:' + errorMsg));

									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									}

								} else {

									if (stats.isDirectory() === true) {
										fileNames.push(name);
									}

									done();
								}
							});
						},

						function() {
							if (callback !== undefined) {
								callback(fileNames);
							}
						}]);
					}
				});
			}

			// when sync mode
			else {

				return RUN(function() {

					var
					// names
					names,

					// error msg
					errorMsg;

					try {

						names = fs.readdirSync(folderPath);

						EACH(names, function(name) {
							if (fs.statSync(folderPath + '/' + name).isDirectory() === true) {
								fileNames.push(name);
							}
						});

						if (callback !== undefined) {
							callback(fileNames);
						}

						return fileNames;

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							console.log(CONSOLE_RED('[UPPERCASE.JS-FIND_FOLDER] ERROR: ' + errorMsg));

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							}
						}
					}
				});
			}
		}
	};
});
