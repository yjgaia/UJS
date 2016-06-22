/**
 * get memory usage.
 */
global.MEMORY_USAGE = METHOD(function(m) {
	'use strict';
	
	var
	//IMPORT: os
	os = require('os'),
	
	// total memory
	totalMemory = os.totalmem();
	
	return {
		
		run : function() {
			
			var
			// free memory
			freeMemory = os.freemem();
			
			return (1 - freeMemory / totalMemory) * 100;
		}
	};
});
