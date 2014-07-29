/*
 * create folder.
 */
global.CREATE_FOLDER = CREATE_FOLDER = METHOD(function() {'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	_path = require('path');

	return {

		run : function(path, callback) {
			//REQUIRED: path
			//REQUIRED: callback

			fs.exists(path, function(isExists) {

				var
				// folder path
				folderPath;

				if (isExists === true) {
					callback();
				} else {

					folderPath = _path.dirname(path);

					fs.exists(folderPath, function(isExists) {

						if (isExists === true) {
							fs.mkdir(path, callback);
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
	};
});
