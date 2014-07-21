/**
 * generate random string.
 */
global.RANDOM_STR = RANDOM_STR = METHOD({

	run : function(length) {'use strict';
		//REQUIRED: length

		var
		// str
		str = '',

		// characters
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

		// i
		i;

		for ( i = 0; i < length; i += 1) {

			str += characters.charAt(RANDOM({
				limit : characters.length
			}));
		}

		return str;
	}
});
