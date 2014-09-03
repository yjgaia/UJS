/**
 * Loading bar class
 */
global.LOADING_BAR = LOADING_BAR = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// bars
		bar1, bar2,

		// done.
		done;

		bar1 = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0,
				height : 3,
				backgroundColor : BROWSER_CONFIG.loadingBarColor,
				zIndex : 999999
			}
		}).appendTo(BODY);

		bar2 = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0,
				height : 3,
				backgroundColor : BROWSER_CONFIG.loadingBarColor,
				zIndex : 999999
			}
		}).appendTo(BODY);

		ANIMATE({
			node : bar1,
			keyframes : KEYFRAMES({
				from : {
					width : '0%'
				},
				to : {
					width : '50%'
				}
			}),
			duration : 0.5
		});

		self.done = done = function() {

			ANIMATE({
				node : bar2,
				keyframes : KEYFRAMES({
					from : {
						width : '0%'
					},
					to : {
						width : '100%'
					}
				}),
				duration : 0.5
			});

			DELAY(0.25, function() {

				bar1.remove();

				ANIMATE({
					node : bar2,
					keyframes : KEYFRAMES({
						from : {
							opacity : 1
						},
						to : {
							opacity : 0
						}
					}),
					duration : 0.25
				});
			});
		};
	}
});
