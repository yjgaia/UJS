/**
 * Td class
 */
global.TD = TD = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'td'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.rowspan
		//OPTIONAL: params.colspan

		var
		// rowspan
		rowspan = params === undefined ? undefined : params.rowspan,

		// colspan
		colspan = params === undefined ? undefined : params.colspan;

		if (rowspan !== undefined) {
			inner.setAttr({
				name : 'rowspan',
				value : rowspan
			});
		}

		if (colspan !== undefined) {
			inner.setAttr({
				name : 'colspan',
				value : colspan
			});
		}
	}
});
