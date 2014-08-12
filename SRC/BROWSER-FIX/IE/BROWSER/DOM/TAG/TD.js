OVERRIDE(TD, function(origin) {
	'use strict';

	/**
	 * Td class (fix for IE)
	 */
	global.TD = TD = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			if (IE.version <= 8) {

				ADD_STYLE({
					node : self,
					style : {
						verticalAlign : 'middle'
					}
				});
			}
		}
	});
});
