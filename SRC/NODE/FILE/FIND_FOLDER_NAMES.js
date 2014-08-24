/*
 * find folder names.
 */
global.FIND_FOLDER_NAMES = FIND_FOLDER_NAMES = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(pathOrParams, callbackOrHandlers) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path
			//OPTIONAL: pathOrParams.isSync
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// path
			path,

			// is sync
			isSync,

			// callback.
			callback,

			// error handler.
			errorHandler,

			// file names
			folderNames = [];

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
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

				fs.readdir(path, function(error, names) {

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

							if (name[0] !== '.') {

								fs.stat(path + '/' + name, function(error, stats) {

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
											folderNames.push(name);
										}

										done();
									}
								});

							} else {
								done();
							}
						},

						function() {
							if (callback !== undefined) {
								callback(folderNames);
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

						names = fs.readdirSync(path);

						EACH(names, function(name) {
							if (name[0] !== '.' && fs.statSync(path + '/' + name).isDirectory() === true) {
								folderNames.push(name);
							}
						});

						if (callback !== undefined) {
							callback(folderNames);
						}

						return folderNames;

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
