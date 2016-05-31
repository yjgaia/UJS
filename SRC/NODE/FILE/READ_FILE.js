/*
 * read file.
 */
global.READ_FILE = METHOD(function() {
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

				CHECK_IS_EXISTS_FILE(path, function(isExists) {

					if (isExists === true) {

						fs.stat(path, function(error, stat) {

							var
							// error msg
							errorMsg;

							if (error !== TO_DELETE) {

								errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR('[UJS-READ_FILE] ERROR: ' + errorMsg);
								}

							} else if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									console.log(CONSOLE_YELLOW('[UJS-READ_FILE] NOT EXISTS! <' + path + '>'));
								}

							} else {

								fs.readFile(path, function(error, buffer) {

									var
									// error msg
									errorMsg;

									if (error !== TO_DELETE) {

										errorMsg = error.toString();

										if (errorHandler !== undefined) {
											errorHandler(errorMsg);
										} else {
											SHOW_ERROR('[UJS-READ_FILE] ERROR: ' + errorMsg);
										}

									} else if (callback !== undefined) {
										callback(buffer);
									}
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							console.log(CONSOLE_YELLOW('[UJS-READ_FILE] NOT EXISTS! <' + path + '>'));
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

					// buffer
					buffer;

					try {

						if (CHECK_IS_EXISTS_FILE({
							path : path,
							isSync : true
						}) === true) {

							if (fs.statSync(path).isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									console.log(CONSOLE_YELLOW('[UJS-READ_FILE] NOT EXISTS! <' + path + '>'));
								}
								
							} else {
								
								buffer = fs.readFileSync(path);
			
								if (callback !== undefined) {
									callback(buffer);
								}
			
								return buffer;
							}

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								console.log(CONSOLE_YELLOW('[UJS-READ_FILE] NOT EXISTS! <' + path + '>'));
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('[UJS-READ_FILE] ERROR: ' + errorMsg);
							}
						}
					}

					// do not run callback.
					return;
				});
			}
		}
	};
});
