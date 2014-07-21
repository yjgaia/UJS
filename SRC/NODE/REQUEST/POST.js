/**
 * ajax POST request.
 */
global.POST = POST = METHOD({

	run : function(params, responseListenerOrListeners) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//REQUIRED: responseListenerOrListeners

		REQUEST(COMBINE_DATA({
			origin : params,
			extend : {
				method : 'POST'
			}
		}), responseListenerOrListeners);
	}
});
