/**
 * HTTP DELETE request.
 */
global.DELETE = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.isSecure
		//OPTIONAL: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([params, {
			method : 'DELETE'
		}]), responseListenerOrListeners);
	}
});
