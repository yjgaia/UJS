/**
 * get CPU_USAGES.
 */
global.CPU_USAGES = METHOD(function(m) {
	
	var
	//IMPORT: os
	os = require('os');
	
	return {
		
		run : function() {
			'use strict';
			
			var
			// cpu infos
			cpuInfos = os.cpus(),
			
			// usages
			usages = [];
			
			EACH(cpuInfos, function(cpuInfo) {
				
				var
				// total
				total = 0,
				
				// idle time
				idleTime;
				
				EACH(cpuInfo.times, function(time, type) {
					total += time;
					if (type === 'idle') {
						idleTime = time;
					}
				});
				
				usages.push((1 - idleTime / total) * 100);
			});
			
			return usages;
		}
	};
});
