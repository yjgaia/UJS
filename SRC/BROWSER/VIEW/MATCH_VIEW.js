/**
 * match view.
 */
global.MATCH_VIEW = MATCH_VIEW = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.uris
		//REQUIRED: params.target

		var
		// uris
		uris = params.uris,

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
			// hash uri parts
			hashURIParts = location.hash.substring(1).split('/'),

			// is not found
			isNotFound,

			// params
			params = {};

			if (location.hash === '#__REFRESING') {
				isNotFound = true;
			} else {

				isNotFound = EACH(uris, function(uri, i) {

					var
					// uri parts
					uriParts = uri.split('/');

					return EACH(hashURIParts, function(hashURIPart, i) {

						var
						// uri part
						uriPart = uriParts[i];

						if (uriPart === '**') {
							isMatched = true;
							return false;
						}

						if (uriPart === undefined) {
							return false;
						}

						// find params.
						if (uriPart.charAt(0) === '{' && uriPart.charAt(uriPart.length - 1) === '}') {
							params[uriPart.substring(1, uriPart.length - 1)] = hashURIPart;
						} else if (uriParts[i] !== hashURIPart && uriPart !== '*') {
							return false;
						}

						if (hashURIParts.length - 1 === i && uriParts.length - 1 > i && uriParts[uriParts.length - 1] !== '') {
							return false;
						}

					}) !== true;
				});
			}

			// when view founded
			if (isNotFound !== true) {

				// when before view not exists, create view.
				if (view === undefined) {

					view = target();
					view.changeParams(params);
					target.lastView = view;

					preParams = params;
				}

				// when before view exists, change params.
				else if (CHECK_ARE_SAME([preParams, params]) !== true) {

					view.changeParams(params);
					preParams = params;
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
