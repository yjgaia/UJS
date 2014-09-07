/**
 * match view.
 */
global.MATCH_VIEW = MATCH_VIEW = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.uri
		//REQUIRED: params.target

		var
		// uri
		uri = params.uri,

		// target
		target = params.target,

		// view
		view,

		// pre params
		preParams;

		EVENT({
			name : 'hashchange'
		}, RAR(function() {

			var
			// hash
			hash = location.hash,

			// uri params
			uriParams;

			// when view founded
			if (hash !== '#__REFRESING' && CHECK_IS_MATCHING_URI({
				format : uri,
				uri : hash.substring(1),
				params : uriParams = {}
			}) === true) {

				// when before view not exists, create view.
				if (view === undefined) {

					view = target();
					view.changeParams(uriParams);
					target.lastView = view;

					preParams = uriParams;
				}

				// when before view exists, change params.
				else if (CHECK_ARE_SAME([preParams, uriParams]) !== true) {

					view.changeParams(uriParams);
					preParams = uriParams;
				}
			}

			// when view not founded, close before view
			else if (view !== undefined) {

				view.close();

				view = undefined;
				target.lastView = undefined;
			}
		}));
	}
});
