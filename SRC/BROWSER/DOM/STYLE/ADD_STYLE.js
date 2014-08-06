/**
 * Add style.
 */
global.ADD_STYLE = ADD_STYLE = METHOD(function(m) {
	'use strict';

	var
	// is support fixed
	isSupportFixed;

	NEXT([
	function(next) {

		// when body exsists
		if (document.body === TO_DELETE) {

			EVENT({
				name : 'load'
			}, next);
		}

		// when body not exsists
		else {
			next();
		}
	},

	function() {
		return function() {

			var
			// el
			el = document.createElement('div');

			el.style.position = 'fixed';
			el.style.top = '10px';

			document.body.appendChild(el);

			isSupportFixed = el.offsetTop === 10;

			document.body.removeChild(el);
		};
	}]);

	return {

		run : function(params) {
			'use strict';
			//REQUIRED: params
			//REQUIRED: params.node
			//REQUIRED: params.style

			var
			// node
			node = params.node,

			// style
			style = params.style,

			// el
			el = node.getDom().getEl(),

			// switch bg to X2.
			switchBGToX2 = function(uri) {

				EXPORT_IMG_TYPE(IMG({
					src : uri
				}), function(type) {

					if (type === 'png' || type === 'gif' || type === 'bmp') {

						// background switch to X2 image.
						X2.switchBG({
							node : node,
							uri : uri
						});
					}
				});
			};

			EACH(style, function(value, name) {

				var
				// resize event
				resizeEvent,

				// scroll event
				scrollEvent,

				// fix position.
				fixPosition;

				// on display resize
				if (name === 'onDisplayResize') {

					resizeEvent = EVENT({
						name : 'resize'
					}, RAR(function() {

						// when this, value is function.
						ADD_STYLE({
							node : node,
							style : value(WIN_WIDTH(), WIN_HEIGHT())
						});
					}));

					// remove resize event when remove node.
					node.addRemoveHandler(function() {
						resizeEvent.remove();
					});

				} else {

					try {

						// fix position fixed when not support fixed.
						if (name === 'position' && value === 'fixed' && isSupportFixed !== true) {

							el.style.position = 'absolute';

							node.__FIXED = true;

							// save fixed position.
							if (node.__FIXED_LEFT === undefined && el.style.left !== '') {
								node.__FIXED_LEFT = INTEGER(el.style.left);
							}

							if (node.__FIXED_RIGHT === undefined && el.style.right !== '') {
								node.__FIXED_RIGHT = INTEGER(el.style.right);
							}

							if (node.__FIXED_TOP === undefined && el.style.top !== '') {
								node.__FIXED_TOP = INTEGER(el.style.top);
							}

							if (node.__FIXED_BOTTOM === undefined && el.style.bottom !== '') {
								node.__FIXED_BOTTOM = INTEGER(el.style.bottom);
							}

							// when scroll
							scrollEvent = EVENT({
								name : 'scroll'
							}, RAR( fixPosition = function() {

								if (node.__FIXED_LEFT !== undefined) {
									el.style.left = (node.__FIXED_LEFT + SCROLL_LEFT()) + 'px';
								}

								if (node.__FIXED_RIGHT !== undefined) {
									el.style.left = (SCROLL_LEFT() + WIN_WIDTH() - node.getWidth() - node.__FIXED_RIGHT) + 'px';
								}

								if (node.__FIXED_TOP !== undefined) {
									el.style.top = (node.__FIXED_TOP + SCROLL_TOP()) + 'px';
								}

								if (node.__FIXED_BOTTOM !== undefined) {
									el.style.top = (SCROLL_TOP() + WIN_HEIGHT() - node.getHeight() - node.__FIXED_BOTTOM) + 'px';
								}
							}));

							// fix position when show.
							node.addShowHandler(function() {
								fixPosition();
							});

							// fix position delayed.
							DELAY(function() {
								fixPosition();
							});

							// remove scroll event when remove node.
							node.addRemoveHandler(function() {
								scrollEvent.remove();
							});
						}

						// save position when fixed.
						else if (node.__FIXED === true && name === 'left') {

							node.__FIXED_LEFT = INTEGER(value);

							el.style.left = (value + SCROLL_LEFT()) + 'px';

						} else if (node.__FIXED === true && name === 'right') {

							node.__FIXED_RIGHT = INTEGER(value);

							el.style.left = (SCROLL_LEFT() + WIN_WIDTH() - node.getWidth() - node.__FIXED_RIGHT) + 'px';

						} else if (node.__FIXED === true && name === 'top') {

							node.__FIXED_TOP = INTEGER(value);

							el.style.top = (value + SCROLL_TOP()) + 'px';

						} else if (node.__FIXED === true && name === 'bottom') {

							node.__FIXED_BOTTOM = INTEGER(value);

							el.style.top = (SCROLL_TOP() + WIN_HEIGHT() - node.getHeight() - node.__FIXED_BOTTOM) + 'px';
						}

						// flt -> float
						else if (name === 'flt') {
							el.style.cssFloat = value;
						}

						// assume number value is px value.
						else if ( typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
							el.style[name] = value + 'px';
						}

						// set background X2 image.
						else if (name === 'backgroundX2Image') {
							el.style.backgroundImage = 'url(' + value + ')';
						}

						// set background image. (not need url prefix.)
						else if (name === 'backgroundImage' && value !== 'none') {

							el.style[name] = 'url(' + value + ')';

							// X2 support.
							if (BROWSER_CONFIG.isNotSupportingX2 !== true &&

							// after INIT_OBJECTS(), check is hd display.
							INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true) {

								// background switch to X2 image.
								switchBGToX2(value);
							}
						}

						// set normal style.
						else {

							el.style[name] = value;

							// X2 support.
							if (BROWSER_CONFIG.isNotSupportingX2 !== true &&

							// after INIT_OBJECTS(), check is hd display.
							INFO.checkIsHDDisplay !== undefined && INFO.checkIsHDDisplay() === true

							// when background.
							&& name === 'background' && value.length >= 7 && value.substring(0, 4) === 'url(') {

								// background switch to X2 image.
								switchBGToX2(value.charAt(4) === '\'' || value.charAt(4) === '"' ? value.substring(5, value.length - 2) : value.substring(4, value.length - 1));
							}

							// cross browser transform
							if (name === 'transform') {
								el.style.WebkitTransform = value;
								el.style.MozTransform = value;
								el.style.OTransform = value;
								el.style.MsTransform = value;
							}

							// cross browser transformOrigin
							else if (name === 'transformOrigin') {
								el.style.WebkitTransformOrigin = value;
								el.style.MozTransformOrigin = value;
								el.style.OTransformOrigin = value;
								el.style.MsTransformOrigin = value;
							}

							// cross browser animation
							else if (name === 'animation') {
								el.style.WebkitAnimation = value;
								el.style.MozAnimation = value;
								el.style.OAnimation = value;
								el.style.MsAnimation = value;
							}

							// cross browser touchCallout
							else if (name === 'touchCallout') {
								el.style.WebkitTouchCallout = value;
								el.style.MozTouchCallout = value;
								el.style.OTouchCallout = value;
								el.style.MsTouchCallout = value;
							}

							// cross browser userSelect
							else if (name === 'userSelect') {
								el.style.WebkitUserSelect = value;
								el.style.MozUserSelect = value;
								el.style.OUserSelect = value;
								el.style.MsUserSelect = value;
							}

							// cross browser backgroundSize
							else if (name === 'backgroundSize') {
								el.style.WebkitBackgroundSize = value;
								el.style.MozBackgroundSize = value;
								el.style.OBackgroundSize = value;
								el.style.MsBackgroundSize = value;
							}

							// cross browser backgroundPosition
							else if (name === 'backgroundPosition') {
								el.style.WebkitBackgroundPosition = value;
								el.style.MozBackgroundPosition = value;
								el.style.OBackgroundPosition = value;
								el.style.MsBackgroundPosition = value;
							}
						}

					} catch(e) {
						// ignore.
					}
				}
			});
		}
	};
});
