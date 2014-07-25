/**
 * ajax DELETE request.
 */
global.DELETE = DELETE = METHOD({

	run : function(uriOrParams, responseListenerOrListeners) {'use strict';
		//REQUIRED: uriOrParams
		//OPTIONAL: uriOrParams.host
		//OPTIONAL: uriOrParams.port
		//OPTIONAL: uriOrParams.uri
		//OPTIONAL: uriOrParams.paramStr
		//OPTIONAL: uriOrParams.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE_DATA({
			origin : CHECK_IS_DATA(uriOrParams) === true ? uriOrParams : {
				uri : uriOrParams
			},
			extend : {
				method : 'DELETE'
			}
		}), responseListenerOrListeners);
	}
});
