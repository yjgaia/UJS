/**
 * Fix for iOS Safari.
 */
RUN(function() {
	'use strict';

	var
	// load fix script.
	loadFixScript = function(name) {
		LOAD(BROWSER_CONFIG.fixScriptsFolderPath + '/IOS/' + name + '.js');
	};

	global.IOS = {};

	/**
	 * fix BROWSER.
	 */

	// fix INFO.
	loadFixScript('BROWSER/INFO');
});
