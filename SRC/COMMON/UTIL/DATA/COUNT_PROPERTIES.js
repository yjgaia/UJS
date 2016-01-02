/**
 * count data's properties
 */
global.COUNT_PROPERTIES = METHOD({

	run : function(data) {
		'use strict';
		//OPTIONAL: data

		var
		// count
		count = 0;
		
		EACH(data, function() {
			count += 1;
		});
		
		return count;
	}
});
