/**
 * HMAC SHA512 encrypt.
 */
global.SHA512 = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.password
		//REQUIRED: params.key

		var
		// password
		password = params.password,

		// key
		key = params.key,

		// crypto
		crypto = require('crypto');

		return crypto.createHmac('sha512', key).update(password).digest('hex');
	}
});
