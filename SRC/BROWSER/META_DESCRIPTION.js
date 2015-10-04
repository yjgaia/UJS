/**
 * get/set meta description.
 */
global.META_DESCRIPTION = METHOD({

	run : function(description) {
		'use strict';
		
		var
		// meta tags
		metaTags,
		
		// i
		i,
		
		// is set
		isSet = false,
		
		// new meta tag
		newMetaTag;
		
		// get.
		if (description === undefined) {
			description = '';
			
			metaTags = document.getElementsByTagName('meta');
			
			for (i = 0; i < metaTags.length; i += 1) {
				if (metaTags[i].name.toLowerCase() === 'description') {
					description = metaTags[i].content;
				}
			}
		}
		
		// set.
		else {
			metaTags = document.getElementsByTagName('meta');
			
			for (i = 0; i < metaTags.length; i += 1) {
				if (metaTags[i].name.toLowerCase() === 'description') {
					metaTags[i].content = description;
					isSet = true;
				}
			}
			
			if (isSet !== true) {
				newMetaTag = document.createElement('meta');
				newMetaTag.name = 'description';
				newMetaTag.content = description;
				
				document.getElementsByTagName('head')[0].appendChild(newMetaTag);
			}
		}

		return description;
	}
});
