/**
 * Browser-side Configuration
 */
global.BROWSER_CONFIG = {
	
	// fixScriptsFolderPath

	host : location.hostname,
	
	port : location.port === '' ? 80 : INTEGER(location.port),
	
	isSecure : location.protocol === 'https:',

	isSupportingX2 : false,
	
	isUsingFlashCanvasPro : false
};
