/**
 * ajax GET request.
 */
global.GET = GET = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.isSecure
		//REQUIRED: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE_DATA({
			origin : CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
				uri : uriOrParams
			},
			extend : {
				method : 'GET'
			}
		}), responseListenerOrListeners);
	}
});
