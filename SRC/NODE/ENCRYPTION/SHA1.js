/**
 * SHA1 encrypt.
 */
global.SHA1 = SHA1 = METHOD({

	run : function(params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.key
		//REQUIRED: params.password

		var
		// key
		key = params.key,

		// password
		password = params.password,

		// crypto
		crypto = require('crypto');

		return crypto.createHmac('sha1', key).update(password).digest('hex');
	}
});
