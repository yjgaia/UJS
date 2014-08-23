// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

TEST('WEB_SERVER', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function(workerData, on, off, broadcast) {

		WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {

			var
			// session key
			sessionKey = requestInfo.cookies.__SESSION_KEY,

			// session store
			sessionStore = SHARED_STORE('sessionStore'),

			// session
			session;

			if (sessionKey !== undefined) {

				session = sessionStore.get(sessionKey);

				if (session === undefined) {

					sessionStore.save({
						name : sessionKey,
						value : {
							data : 'This is session data.',
							removeAfterSeconds : 30 * 60 // 30 minutes
						}
					});

					console.log('create session.');

				} else {

					console.log(session.data + ' (WORKER #' + workerData.id + ')');
				}
			}

			response({
				content : 'Welcome to UPPERCASE.JS web server! (WORKER #' + workerData.id + ')',

				headers : sessionKey !== undefined ? undefined : {

					'Set-Cookie' : CREATE_COOKIE_STR_ARRAY({
						__SESSION_KEY : RANDOM_STR(40)
					})
				}
			});
		});
	});
});
