/*
 * read file.
 */
global.READ_FILE = READ_FILE = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs');

	return {

		run : function(pathOrParams, callbackOrHandlers) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path
			//OPTIONAL: pathOrParams.isSync
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error

			var
			// path
			path,

			// is sync
			isSync,

			// callback.
			callback,

			// not eixsts handler.
			notExistsHandler,

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
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
				}
			}

			// when normal mode
			if (isSync !== true) {

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
								} else {
									console.log(CONSOLE_YELLOW('[UPPERCASE.JS-READ_FILE] NOT EXISTS! <' + path + '>'));
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

									} else if (callback !== undefined) {
										callback(content);
									}
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							console.log(CONSOLE_YELLOW('[UPPERCASE.JS-READ_FILE] NOT EXISTS! <' + path + '>'));
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(function() {

					var
					// error msg
					errorMsg,

					// content
					content;

					try {

						if (fs.existsSync(path) === true) {

							if (fs.statSync(path).isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									console.log(CONSOLE_YELLOW('[UPPERCASE.JS-READ_FILE] NOT EXISTS! <' + path + '>'));
								}

							} else {

								content = fs.readFileSync(path);

								if (callback !== undefined) {
									callback(content);
								}

								return content;
							}

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								console.log(CONSOLE_YELLOW('[UPPERCASE.JS-READ_FILE] NOT EXISTS! <' + path + '>'));
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							console.log(CONSOLE_RED('[UPPERCASE.JS-READ_FILE] ERROR: ' + errorMsg));

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
