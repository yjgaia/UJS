/*
 * build UPPERCASE.JS.
 */
global.BUILD = function() {'use strict';

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
	scanFolder = function(path, func) {
		//REQUIRED: path
		//REQUIRED: func

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
						func(fs.readFileSync(fullPath));
					}
				}
			});

			for ( i = 0; i < folderPaths.length; i += 1) {
				scanFolder(folderPaths[i], func);
			}
		}
	},

	// minify.
	minify = function(script) {

		var
		// uglify-js
		uglifyJS = require('uglify-js');

		// minify script.
		return uglifyJS.minify(String(script), {
			fromString : true,
			mangle : true
		}).code;
	},

	// save.
	save = function(script, path) {
		fs.writeFileSync('../' + path, script);
	},

	// dist folder.
	distFolder = function(name) {

		var
		// script
		script = '';

		log('BUILD [' + name + ']');

		scanFolder(name, function(content) {
			script += content;
		});

		save(minify(script), 'UPPERCASE.JS-' + name + '.js');
	},

	// copy folder.
	copyFolder = function(from, to) {

		if (fs.statSync(from).isDirectory() === true) {
			if (fs.existsSync('../' + to) !== true || fs.statSync('../' + to).isDirectory() !== true) {
				fs.mkdirSync('../' + to);
			}
			fs.readdirSync(from).forEach(function(name) {
				if (name[0] !== '.') {
					copyFolder(from + '/' + name, to + '/' + name);
				}
			});
		} else if (path.extname(from) === '.js') {
			save(minify(fs.readFileSync(from)), to);
		} else {
			fs.createReadStream(from).pipe(fs.createWriteStream('../' + to));
		}
	};

	(function() {

		var
		// script
		script = '';

		log('BUILD [COMMON]');

		script += fs.readFileSync('COMMON/TO_DELETE.js');
		script += fs.readFileSync('COMMON/CONFIG.js');

		script += fs.readFileSync('COMMON/OOP/METHOD.js');
		script += fs.readFileSync('COMMON/OOP/CLASS.js');
		script += fs.readFileSync('COMMON/OOP/OBJECT.js');
		script += fs.readFileSync('COMMON/OOP/INIT_OBJECTS.js');
		
		scanFolder('COMMON/UTIL', function(content) {
			script += content;
		});

		save(minify(script), 'UPPERCASE.JS-COMMON.js');
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
