/*
 * copy file.
 */
global.COPY_FILE = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//REQUIRED: params.from
			//REQUIRED: params.to
			//OPTIONAL: params.isSync
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.notExistsHandler
			//OPTIONAL: callbackOrHandlers.error

			var
			// from
			from = params.from,

			// to
			to = params.to,

			// is sync
			isSync = params.isSync,

			// callback.
			callback,

			// not exists handler.
			notExistsHandler,

			// error handler.
			errorHandler;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
				}
			}

			CREATE_FOLDER({
				path : _path.dirname(to),
				isSync : isSync
			}, {

				error : errorHandler,

				success : function() {

					// when normal mode
					if (isSync !== true) {

						CHECK_IS_EXISTS_FILE(from, function(isExists) {

							var
							// reader
							reader;

							if (isExists === true) {

								reader = fs.createReadStream(from);

								reader.pipe(fs.createWriteStream(to));

								reader.on('error', function(error) {

									var
									// error msg
									errorMsg = error.toString();

									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log(CONSOLE_RED('[UPPERCASE.JS-COPY_FILE] ERROR:' + errorMsg));
									}
								});

								reader.on('end', function() {
									if (callback !== undefined) {
										callback();
									}
								});

							} else {

								if (notExistsHandler !== undefined) {
									notExistsHandler(from);
								} else {
									console.log(CONSOLE_YELLOW('[UPPERCASE.JS-COPY_FILE] NOT EXISTS! <' + from + '>'));
								}
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

								if (CHECK_IS_EXISTS_FILE({
									path : from,
									isSync : true
								}) === true) {

									fs.writeFileSync(to, fs.readFileSync(from));

								} else {

									if (notExistsHandler !== undefined) {
										notExistsHandler(from);
									} else {
										console.log(CONSOLE_YELLOW('[UPPERCASE.JS-COPY_FILE] NOT EXISTS! <' + from + '>'));
									}

									// do not run callback.
									return;
								}

							} catch(error) {

								if (error !== TO_DELETE) {

									errorMsg = error.toString();

									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log(CONSOLE_RED('[UPPERCASE.JS-COPY_FILE] ERROR: ' + errorMsg));
									}
								}
							}

							if (callback !== undefined) {
								callback();
							}
						});
					}
				}
			});
		}
	};
});
