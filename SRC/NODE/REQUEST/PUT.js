/**
 * HTTP PUT request.
 */
global.PUT = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//REQUIRED: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//OPTIONAL: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'PUT'
		}]), responseListenerOrListeners);
	}
});
