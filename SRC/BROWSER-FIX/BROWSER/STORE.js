OVERRIDE(STORE, function(origin) {

	/**
	 * Local Store class (fix.)
	 */
	global.STORE = STORE = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// gen full key.
			genFullKey = inner.genFullKey,

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			//OVERRIDE: self.save
			self.save = save = function(params) {
				//REQUIRED: params
				//REQUIRED: params.key
				//REQUIRED: params.value
				//OPTIONAL: params.isToSession

				var
				// key
				key = params.key,

				// value
				value = params.value,

				// expire time
				expireTime,

				// is to session
				isToSession = params.isToSession;

				if (isToSession === true) {
					expireTime = 0;
				} else {

					// 1 year
					expireTime = new Date();
					expireTime.setDate(expireTime.getDate() + 356);
				}

				document.cookie = genFullKey(key) + '=' + encodeURIComponent(JSON.stringify(value)) + '; path=/; expires=' + expireTime.toGMTString() + ';';
			};

			//OVERRIDE: self.save
			self.get = get = function(key) {
				//REQUIRED: key

				var
				// cookie
				cookie = document.cookie,

				// isPop
				pop,

				// extras
				i, temp, d;

				key = genFullKey(key) + '=';

				i = cookie.indexOf(key);

				if (cookie && i >= 0) {
					temp = cookie.substring(i, cookie.length);
					d = temp.indexOf(';');
					if (d > 0) {
						pop = temp.substring(key.length, d);
					} else {
						pop = temp.substring(key.length);
					}
				}
				return pop === undefined ? undefined : JSON.parse(decodeURIComponent(pop));
			};

			//OVERRIDE: self.save
			self.remove = remove = function(key) {
				//REQUIRED: key

				var
				// expire time
				expireTime;

				expireTime = new Date();
				expireTime.setDate(expireTime.getDate() - 1);

				document.cookie = genFullKey(key) + '=; path=/; expires=' + expireTime.toGMTString() + ';';
			};
		}
	});
});
