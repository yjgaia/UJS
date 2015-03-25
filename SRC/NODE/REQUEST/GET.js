/**
 * HTTP GET request.
 */
global.GET = METHOD(function(m) {
	'use strict';
	
	var
	//IMPORT: url
	url = require('url');
	
	return {

		run : function(urlOrParams, responseListenerOrListeners) {
			//REQUIRED: urlOrParams
			//REQUIRED: urlOrParams.host
			//OPTIONAL: urlOrParams.port
			//OPTIONAL: urlOrParams.isSecure
			//REQUIRED: urlOrParams.uri
			//OPTIONAL: urlOrParams.paramStr
			//OPTIONAL: urlOrParams.data
			//REQUIRED: responseListenerOrListeners
			
			var
			// url data
			urlData,
			
			// params
			params;
			
			if (CHECK_IS_DATA(urlOrParams) !== true) {
				
				urlData = url.parse(urlOrParams);
				
				params = {
					host : urlData.hostname === TO_DELETE ? undefined : urlData.hostname,
					port : urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port),
					isSecure : urlData.protocol === 'https:',
					uri : urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1),
					paramStr : urlData.query === TO_DELETE ? undefined : urlData.query
				};
					
			} else {
				params = urlOrParams;
			}
	
			REQUEST(COMBINE([params, {
				method : 'GET'
			}]), responseListenerOrListeners);
		}
		};
	});
