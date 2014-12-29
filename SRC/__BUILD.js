// load UPPERCASE.JS.
require('../UPPERCASE.JS-COMMON.js');
require('../UPPERCASE.JS-NODE.js');

/*
 * build UPPERCASE.JS.
 */
RUN(function() {
	'use strict';

	var
	//IMPORT: path
	path = require('path'),

	//IMPORT: uglify
	uglifyJS = require('uglify-js'),

	// log.
	log = function(msg) {
		console.log('UPPERCASE.JS BUILD: ' + msg);
	},

	// scan folder.
	scanFolder = function(scripts, path) {
		//REQUIRED: scripts
		//REQUIRED: path

		FIND_FILE_NAMES({
			path : path,
			isSync : true
		}, function(fileNames) {
			EACH(fileNames, function(fileName) {
				scripts.push(path + '/' + fileName);
			});
		});

		FIND_FOLDER_NAMES({
			path : path,
			isSync : true
		}, function(folderNames) {
			EACH(folderNames, function(folderName) {
				scanFolder(scripts, path + '/' + folderName);
			});
		});
	},

	// save.
	save = function(scripts, path) {

		var
		// result
		result = uglifyJS.minify(scripts, {
			mangle : true
		});

		WRITE_FILE({
			path : '../' + path,
			content : result.code,
			isSync : true
		});
	},

	// build folder.
	buildFolder = function(name) {

		var
		// scripts
		scripts = [];

		log('BUILD [' + name + ']');

		scanFolder(scripts, name);

		save(scripts, 'UPPERCASE.JS-' + name + '.js');
	},

	// copy folder.
	copyFolder = function(from, to, name) {

		FIND_FILE_NAMES({
			path : from,
			isSync : true
		}, function(fileNames) {
			EACH(fileNames, function(fileName) {
				if (path.extname(fileName) === '.js') {
					save([from + '/' + fileName], to + '/' + fileName);
				} else {
					COPY_FILE({
						from : from + '/' + fileName,
						to : '../' + to + '/' + fileName,
						isSync : true
					});
				}
			});
		});

		FIND_FOLDER_NAMES({
			path : from,
			isSync : true
		}, function(folderNames) {
			EACH(folderNames, function(folderName) {
				copyFolder(from + '/' + folderName, to + '/' + folderName, folderName);
			});
		});
	};

	INIT_OBJECTS();

	RUN(function() {

		var
		// scripts
		scripts = [];

		log('BUILD [COMMON]');

		scripts.push('COMMON/TO_DELETE.js');
		scripts.push('COMMON/CONFIG.js');
		scripts.push('COMMON/METHOD.js');
		scripts.push('COMMON/OOP/CLASS.js');
		scripts.push('COMMON/OOP/OBJECT.js');
		scripts.push('COMMON/OOP/INIT_OBJECTS.js');

		scanFolder(scripts, 'COMMON/UTIL');

		save(scripts, 'UPPERCASE.JS-COMMON.js');
	});

	buildFolder('BROWSER');

	RUN(function() {

		log('BUILD [BROWSER-FIX]');

		copyFolder('BROWSER-FIX', 'UPPERCASE.JS-BROWSER-FIX');
	});

	buildFolder('NODE');
	buildFolder('PHANTOM');
	
	log('DONE.');
});
