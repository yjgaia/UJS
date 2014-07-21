/**
 * A class
 */
global.A = A = CLASS({

	preset : function() {'use strict';
		return DOM;
	},

	params : function() {'use strict';
		return {
			tag : 'a'
		};
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.href
		//OPTIONAL: params.target
		//OPTIONAL: params.style

		var
		// href
		href = params.href,

		// target
		target = params.target,

		// style
		style = params.style,

		// change href.
		changeHref,

		// tap.
		tap;

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

			FIRE_ALL({
				node : self,
				name : 'tap'
			});
		};
	}
});
