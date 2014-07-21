OVERRIDE(IMG, function(origin) {'use strict';

	/**
	 * Img class (fix for IE.)
	 */
	global.IMG = IMG = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			var
			// set src.
			setSrc;

			if (IE.version <= 8) {
				if (self.getStyle('width') === undefined && self.getStyle('height') !== undefined) {
					self.addStyle({
						width : 'auto'
					});
				}
				if (self.getStyle('width') !== undefined && self.getStyle('height') === undefined) {
					self.addStyle({
						height : 'auto'
					});
				}
			}

			if (IE.version <= 10) {

				OVERRIDE(self.setSrc, function(origin) {

					self.setSrc = setSrc = function(src) {
						//REQUIRED: src

						// fix IE6 image memory leak.
						origin(src + (src.indexOf('?') === -1 ? ('?' + Date.now()) : ('&' + Date.now())));
					};
				});

				setSrc(self.getSrc());
			}

			if (IE.version <= 6 && self.getSrc().indexOf('.gif') === -1) {
				ADD_STYLE({
					node : self,
					style : {
						behavior : 'url(' + BROWSER_CONFIG.fixScriptsFolderPath + '/IE/BROWSER/LIB/iepngfix/iepngfix.htc?' + (CONFIG.version !== undefined ? CONFIG.version : Date.now()) + ');'
					}
				});
			}
		}
	});
});
