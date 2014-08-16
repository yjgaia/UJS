/**
 * ajax PUT request.
 */
global.PUT = PUT = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.host
		//REQUIRED: params.port
		//OPTIONAL: params.isSecure
		//REQUIRED: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([params, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});