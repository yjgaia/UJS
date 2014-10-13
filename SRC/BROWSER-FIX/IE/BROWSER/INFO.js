OVERRIDE(INFO, function(origin) {
	'use strict';

	/**
	 * Browser information object (fix for IE)
	 */
	global.INFO = INFO = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self) {

			var
			// get lang.
			getLang,
			
			// check is HD display.
			checkIsHDDisplay,

			// check is touchable display.
			checkIsTouchableDisplay;

			if (navigator.language === undefined) {

				self.getLang = getLang = function() {

					var
					// language
					lang = STORE('__INFO').get('lang');

					if (lang === undefined) {

						lang = navigator.userLanguage;

						if (lang.length > 2) {
							lang = lang.substring(0, 2);
						}

						lang = lang.toLowerCase();
					}

					return lang;
				};
			}

			// IE not support HD display force.
			// because many IE are low performance.
			self.checkIsHDDisplay = checkIsHDDisplay = function() {
				return false;
			};

			self.checkIsTouchableDisplay = checkIsTouchableDisplay = function() {
				return navigator.msPointerEnabled !== undefined;
			};
		}
	});
});
