/**
 * ajax DELETE request.
 */
global.DELETE = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//OPTIONAL: uriOrParams.isNotUsingLoadingBar
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE([CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
			uri : uriOrParams
		}, {
			method : 'DELETE'
		}]), responseListenerOrListeners);
	}
});
