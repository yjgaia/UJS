/**
 * Browser information object
 */
global.INFO = INFO = OBJECT({

	init : function(inner, self) {
		'use strict';

		var
		// browser info
		browserInfo,

		// get lang.
		getLang,

		// change lang.
		changeLang,

		// check is HD display.
		checkIsHDDisplay,

		// check is touchable display.
		checkIsTouchableDisplay,

		// check is not exists tap delay.
		checkIsNotExistsTapDelay,

		// get browser info.
		getBrowserInfo;

		self.getLang = function() {

			var
			// language
			lang = STORE('__INFO').get('lang');

			if (lang === undefined) {

				lang = navigator.language;

				if (lang.length > 2) {
					lang = lang.substring(0, 2);
				}

				lang = lang.toLowerCase();
			}

			return lang;
		};

		self.changeLang = changeLang = function(lang) {
			//REQUIRED: lang

			STORE('__INFO').save({
				key : 'lang',
				value : lang
			});

			location.reload();
		};

		self.checkIsHDDisplay = checkIsHDDisplay = function() {
			return global.devicePixelRatio !== undefined && devicePixelRatio > 1 ? true : false;
		};

		self.checkIsTouchableDisplay = checkIsTouchableDisplay = function() {
			return global.ontouchstart !== undefined;
		};

		self.checkIsNotExistsTapDelay = checkIsNotExistsTapDelay = function() {

			var
			// browser info
			browserInfo = getBrowserInfo();

			if (browserInfo.name === 'Chrome' && INTEGER(browserInfo.version) >= 32) {
				return true;
			}
			return false;
		};

		self.getBrowserInfo = getBrowserInfo = function() {
			// using bowser. (https://github.com/ded/bowser)
			return bowser;
		};
	}
});
