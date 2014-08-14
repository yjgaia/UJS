/*
 * build UPPERCASE.JS.
 */
global.BUILD = function() {
	'use strict';

	var
	//IMPORT: fs
	fs = require('fs'),

	//IMPORT: path
	path = require('path'),

	// log.
	log = function(msg) {
		console.log('UPPERCASE.JS BUILD: ' + msg);
	},

	// scan folder.
	scanFolder = function(scripts, path) {
		//REQUIRED: scripts
		//REQUIRED: path

		var
		// folder paths
		folderPaths,

		// extra
		i;

		if (fs.existsSync(path) === true) {

			folderPaths = [];

			fs.readdirSync(path).forEach(function(name) {

				var
				// full path
				fullPath = path + '/' + name;

				if (name[0] !== '.') {
					if (fs.statSync(fullPath).isDirectory() === true) {
						folderPaths.push(fullPath);
					} else {
						scripts.push(fullPath);
					}
				}
			});

			for ( i = 0; i < folderPaths.length; i += 1) {
				scanFolder(scripts, folderPaths[i]);
			}
		}
	},

	// save.
	save = function(scripts, path) {

		var
		// uglify-js
		uglifyJS = require('uglify-js'),

		// result
		result = uglifyJS.minify(scripts, {
			mangle : true
		});

		fs.writeFileSync('../' + path, result.code);
	},

	// dist folder.
	distFolder = function(name) {

		var
		// scripts
		scripts = [];

		log('BUILD [' + name + ']');

		scanFolder(scripts, name);

		save(scripts, 'UPPERCASE.JS-' + name + '.js');
	},

	// copy folder.
	copyFolder = function(from, to, name) {

		if (fs.statSync(from).isDirectory() === true) {
			if (fs.existsSync('../' + to) !== true || fs.statSync('../' + to).isDirectory() !== true) {
				fs.mkdirSync('../' + to);
			}
			fs.readdirSync(from).forEach(function(name) {
				if (name[0] !== '.') {
					copyFolder(from + '/' + name, to + '/' + name, name);
				}
			});
		} else if (path.extname(from) === '.js') {
			save([from], to);
		} else {
			fs.createReadStream(from).pipe(fs.createWriteStream('../' + to));
		}
	};

	(function() {

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
	})();

	distFolder('BROWSER');

	(function() {

		log('BUILD [BROWSER-FIX]');

		copyFolder('BROWSER-FIX', 'UPPERCASE.JS-BROWSER-FIX');
	})();

	distFolder('NODE');
	distFolder('PHANTOM');
	distFolder('TITANIUM');

	log('DONE.');
};
BUILD();
