/*
 * find file names.
 */
global.FIND_FILE_NAMES = FIND_FILE_NAMES = METHOD(function() {
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
			fileNames = [];

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

						if (errorHandler !== undefined) {
							errorHandler(errorMsg);
						} else {
							console.log(CONSOLE_RED('[UPPERCASE.JS-FIND_FILE_NAMES] ERROR:' + errorMsg));
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

										if (errorHandler !== undefined) {
											errorHandler(errorMsg);
										} else {
											console.log(CONSOLE_RED('[UPPERCASE.JS-FIND_FILE_NAMES] ERROR:' + errorMsg));
										}

									} else {

										if (stats.isDirectory() !== true) {
											fileNames.push(name);
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

						names = fs.readdirSync(path);

						EACH(names, function(name) {
							if (name[0] !== '.' && fs.statSync(path + '/' + name).isDirectory() !== true) {
								fileNames.push(name);
							}
						});

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.JS-FIND_FILE_NAMES] ERROR: ' + errorMsg));
							}
						}
					}

					if (callback !== undefined) {
						callback(fileNames);
					}

					return fileNames;
				});
			}
		}
	};
});
