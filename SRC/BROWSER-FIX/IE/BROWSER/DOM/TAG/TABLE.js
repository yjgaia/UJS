OVERRIDE(TABLE, function(origin) {
	'use strict';

	/**
	 * Table class (fix for IE<=7.)
	 */
	global.TABLE = TABLE = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			//OPTIONAL: params
			//OPTIONAL: params.c

			var
			// children
			children = params === undefined ? undefined : (params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c]),

			// tbody
			tbody = DOM({
				tag : 'tbody'
			}).appendTo(self),

			// append.
			append,

			// prepend.
			prepend,

			// empty.
			empty,

			// get children.
			getChildren;

			self.append = append = function(node) {
				//REQUIRED: node

				tbody.append(node);
			};

			if (children !== undefined) {
				EACH(children, function(child, i) {
					append(child);
				});
			}

			self.prepend = prepend = function(node) {
				//REQUIRED: node

				tbody.prepend(node);
			};

			self.empty = empty = function() {
				tbody.empty();
			};

			self.getChildren = getChildren = function() {
				return tbody.getChildren();
			};
		}
	});
});
