/*
 * check is folder.
 */
global.CHECK_IS_FOLDER = METHOD(function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs');

	return {

		run : function(pathOrParams, callback) {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path
			//OPTIONAL: pathOrParams.isSync
			//OPTIONAL: callback

			var
			// path
			path,

			// is sync
			isSync;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			// when normal mode
			if (isSync !== true) {
				
				fs.stat(path, function(error, stat) {
					
					var
					// error msg
					errorMsg;

					if (error !== TO_DELETE) {

						errorMsg = error.toString();

						if (errorHandler !== undefined) {
							errorHandler(errorMsg);
						} else {
							console.log(CONSOLE_RED('[UJS-CHECK_IS_FOLDER] ERROR: ' + errorMsg));
						}

					} else if (callback !== undefined) {
						callback(stat.isDirectory());
					}
				});
			}

			// when sync mode
			else {
				return fs.statSync(path).isDirectory();
			}
		}
	};
});
