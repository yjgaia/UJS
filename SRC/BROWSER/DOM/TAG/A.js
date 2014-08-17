/**
 * A class
 */
global.A = A = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'a'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.href
		//OPTIONAL: params.target
		//OPTIONAL: params.style

		var
		// href
		href,
		
		// target
		target,
		
		// style
		style,
		
		// change href.
		changeHref,

		// tap.
		tap;

		// init params.
		if (params !== undefined) {
			href = params.href;
			target = params.target;
			style = params.style;
		}

		self.changeHref = changeHref = function(href) {
			inner.setAttr({
				name : 'href',
				value : href
			});
		};

		if (href !== undefined) {
			changeHref(href);
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (style === undefined || style.cursor === undefined) {
			self.addStyle({
				cursor : 'pointer'
			});
		}

		if (style === undefined || style.textDecoration === undefined) {
			self.addStyle({
				textDecoration : 'underline'
			});
		}

		self.tap = tap = function() {

			EVENT.fireAll({
				node : self,
				name : 'tap'
			});
		};
	}
});
