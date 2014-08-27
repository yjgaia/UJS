/*
 * create folder.
 */
global.CREATE_FOLDER = CREATE_FOLDER = METHOD(function() {
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

			// folder path
			folderPath,

			// callback.
			callback,

			// error handler.
			errorHandler;

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

				fs.exists(path, function(isExists) {

					if (isExists === true) {

						if (callback !== undefined) {
							callback();
						}

					} else {

						folderPath = _path.dirname(path);

						fs.exists(folderPath, function(isExists) {

							if (isExists === true) {

								fs.mkdir(path, function(error) {

									var
									// error msg
									errorMsg;

									if (error !== TO_DELETE) {

										errorMsg = error.toString();

										if (errorHandler !== undefined) {
											errorHandler(errorMsg);
										} else {
											console.log(CONSOLE_RED('[UPPERCASE.JS-CREATE_FOLDER] ERROR: ' + errorMsg));
										}

									} else {
										callback();
									}
								});

							} else {

								CREATE_FOLDER(folderPath, function() {

									// retry.
									CREATE_FOLDER(path, callback);
								});
							}
						});
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

						if (fs.existsSync(path) !== true) {

							folderPath = _path.dirname(path);

							if (fs.existsSync(folderPath) === true) {
								fs.mkdirSync(path);
							} else {

								CREATE_FOLDER({
									path : folderPath,
									isSync : true
								});

								// retry.
								CREATE_FOLDER({
									path : path,
									isSync : true
								});
							}
						}

						if (callback !== undefined) {
							callback();
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								console.log(CONSOLE_RED('[UPPERCASE.JS-CREATE_FOLDER] ERROR: ' + errorMsg));
							}
						}
					}
				});
			}
		}
	};
});
