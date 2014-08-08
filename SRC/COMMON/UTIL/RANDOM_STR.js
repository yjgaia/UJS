/**
 * generate random string.
 */
global.RANDOM_STR = RANDOM_STR = METHOD({

	run : function(length) {
		'use strict';
		//REQUIRED: length

		var
		// random string
		randomString = '',

		// characters
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

		// i
		i;

		REPEAT(length, function() {

			// add random character to random string.
			randomString += characters.charAt(RANDOM({
				limit : characters.length
			}));
		});

		return randomString;
	}
});
