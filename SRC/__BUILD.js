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
	save = function(scriptPaths, path, isToSaveMin) {

		var
		// content
		content,
		
		// minify result
		minifyResult;
		
		EACH(scriptPaths, function(scriptPath) {
			
			if (content === undefined) {
				content = '';
			} else {
				content += '\n';
			}
			
			content += READ_FILE({
				path : scriptPath,
				isSync : true
			}).toString();
		});
		
		WRITE_FILE({
			path : '../' + path + '.js',
			content : content,
			isSync : true
		});
		
		if (isToSaveMin === true) {
		
			minifyResult = uglifyJS.minify(scriptPaths, {
				mangle : true
			});
	
			WRITE_FILE({
				path : '../' + path + '.MIN.js',
				content : minifyResult.code,
				isSync : true
			});
		}
	},

	// build folder.
	buildFolder = function(name, isToSaveMin) {

		var
		// scripts
		scripts = [];

		log('BUILD [' + name + ']');

		scanFolder(scripts, name);

		save(scripts, 'UPPERCASE.JS-' + name, isToSaveMin);
	},

	// copy folder.
	copyFolder = function(from, to, name) {

		FIND_FILE_NAMES({
			path : from,
			isSync : true
		}, function(fileNames) {
			EACH(fileNames, function(fileName) {
				COPY_FILE({
					from : from + '/' + fileName,
					to : '../' + to + '/' + fileName,
					isSync : true
				});
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

		save(scripts, 'UPPERCASE.JS-COMMON', true);
	});

	buildFolder('BROWSER', true);

	RUN(function() {

		log('BUILD [BROWSER-FIX]');

		copyFolder('BROWSER-FIX', 'UPPERCASE.JS-BROWSER-FIX');
	});

	buildFolder('NODE');
	
	log('DONE.');
});
