OVERRIDE(EVENT_LOW, function(origin) {'use strict';

	/**
	 * Low event class (fix for IE.)
	 */
	global.EVENT_LOW = EVENT_LOW = CLASS({

		preset : function(params) {
			//REQUIRED: params
			//OPTIONAL: params.node
			//REQUIRED: params.name

			var
			// node
			node = params.node,

			// name
			name = params.name,

			// el
			el;

			if (node !== undefined) {
				el = node.getDom().getEl();
			} else if (global['on' + name] === undefined) {
				el = document;
			} else {
				el = global;
			}

			// if is not exists addEventListener, link to attachEvent.
			if (el.addEventListener === undefined) {
				el.addEventListener = function(name, func, b) {
					el.attachEvent('on' + name, func);
				};
			}

			return origin;
		},

		init : function(inner, self, params, func) {
			//REQUIRED: params
			//OPTIONAL: params.node
			//REQUIRED: params.name
			//REQUIRED: func

			var
			// node
			node = params.node,

			// name
			name = params.name,

			// el
			el,

			// hash
			hash,

			// hashchange interval
			hashchangeInterval,

			// inner func.
			innerFunc = inner.innerFunc,

			// remove.
			remove;

			if (node !== undefined) {
				el = node.getDom().getEl();
			} else if (global['on' + name] === undefined) {
				el = document;
			} else {
				el = global;
			}

			// if image is cached image, not fire load event. (IE <= 8 bug)
			if (IE.version <= 8 && name === 'load' && el.complete !== undefined) {

				RUN(function() {

					var
					// interval
					interval;

					interval = setInterval(RAR(function() {
						if (el.complete === true) {

							clearInterval(interval);

							try {
								innerFunc();
							} catch(e) {
								// ignore.
							}
						}
					}), 100);
				});
			}

			// if is exists detachEvent, remove work by detachEvent.
			if (el.detachEvent !== undefined) {

				OVERRIDE(self.remove, function(origin) {

					self.remove = remove = function() {

						if (name === 'hashchange' && global.onhashchange === undefined) {
							origin();
						} else {
							el.detachEvent('on' + name, innerFunc);
						}
					};
				});
			}

			// when ms pointer enabled
			if (navigator.msPointerEnabled === true) {

				// touchstart link to MSPointerDown
				if (name === 'touchstart') {

					el.addEventListener('MSPointerDown', innerFunc);

					OVERRIDE(self.remove, function(origin) {

						self.remove = remove = function() {
							el.removeEventListener('MSPointerDown', innerFunc);
						};
					});
				}

				// touchmove link to MSPointerMove
				else if (name === 'touchmove') {

					el.addEventListener('MSPointerMove', innerFunc);

					OVERRIDE(self.remove, function(origin) {

						self.remove = remove = function() {
							el.removeEventListener('MSPointerMove', innerFunc);
						};
					});
				}

				// touchend link to MSPointerUp
				else if (name === 'touchend') {

					el.addEventListener('MSPointerUp', innerFunc);

					OVERRIDE(self.remove, function(origin) {

						self.remove = remove = function() {
							el.removeEventListener('MSPointerUp', innerFunc);
						};
					});
				}
			}

			// simulate hashchange event. (IE <= 7)
			if (name === 'hashchange' && IE.version <= 7) {

				hash = location.hash;
				hashchangeInterval = setInterval(function() {
					if (location.hash !== hash) {
						hash = location.hash;
						func(undefined, node);
					}
				}, 100);

				OVERRIDE(self.remove, function(origin) {

					self.remove = remove = function() {
						clearInterval(hashchangeInterval);
					};
				});
			}
		}
	});
});
