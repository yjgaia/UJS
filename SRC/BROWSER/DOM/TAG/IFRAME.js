/**
 * IFrame class
 */
global.IFRAME = IFRAME = CLASS({

	preset : function() {'use strict';
		return DOM;
	},

	params : function() {'use strict';
		return {
			tag : 'iframe',
			style : {
				border : 'none'
			}
		};
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.name
		//OPTIONAL: params.src

		var
		// name
		name = params.name,

		// src
		src = params.src,

		// set src.
		setSrc,

		// get src.
		getSrc;

		inner.setAttr({
			name : 'allowTransparency',
			value : true
		});

		inner.setAttr({
			name : 'frameBorder',
			value : 0
		});

		if (name !== undefined) {
			inner.setAttr({
				name : 'name',
				value : name
			});
		}

		self.setSrc = setSrc = function(_src) {
			//REQUIRED: _src

			src = _src;

			inner.setAttr({
				name : 'src',
				value : src
			});
		};

		if (src !== undefined) {
			setSrc(src);
		}

		self.getSrc = getSrc = function() {
			return src;
		};
	}
});
