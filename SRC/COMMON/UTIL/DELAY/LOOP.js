/**
 * Loop class (for game etc.)
 */
global.LOOP = CLASS(function(cls) {
	'use strict';

	var
	// before time
	beforeTime,

	// animation interval
	animationInterval,

	// loop infos
	loopInfos = [],

	// runs
	runs = [],

	// fire.
	fire = function() {

		if (animationInterval === undefined) {

			beforeTime = Date.now();

			animationInterval = INTERVAL(function() {

				var
				// time
				time = Date.now(),

				// times
				times = time - beforeTime,

				// loop info
				loopInfo,

				// count
				count,

				// interval
				interval,

				// i, j
				i, j;

				if (times > 0) {

					for ( i = 0; i < loopInfos.length; i += 1) {

						loopInfo = loopInfos[i];

						if (loopInfo.fps !== undefined && loopInfo.fps > 0) {

							if (loopInfo.timeSigma === undefined) {
								loopInfo.timeSigma = 0;
								loopInfo.countSigma = 0;
							}

							// calculate count.
							count = parseInt(loopInfo.fps / (1000 / times) * (loopInfo.timeSigma / times + 1), 10) - loopInfo.countSigma;

							// start.
							if (loopInfo.start !== undefined) {
								loopInfo.start();
							}

							// run interval.
							interval = loopInfo.interval;
							for ( j = 0; j < count; j += 1) {
								interval();
							}

							// end.
							if (loopInfo.end !== undefined) {
								loopInfo.end(times);
							}

							loopInfo.countSigma += count;

							loopInfo.timeSigma += times;
							if (loopInfo.timeSigma > 1000) {
								loopInfo.timeSigma = undefined;
							}
						}
					}

					// run runs.
					for ( i = 0; i < runs.length; i += 1) {
						runs[i](times);
					}

					beforeTime = time;
				}
			});
		}
	},

	// stop.
	stop = function() {

		if (loopInfos.length <= 0 && runs.length <= 0) {

			animationInterval.remove();
			animationInterval = undefined;
		}
	};

	return {

		init : function(inner, self, fps, intervalOrFuncs) {
			//OPTIONAL: fps
			//OPTIONAL: intervalOrFuncs
			//OPTIONAL: intervalOrFuncs.start
			//REQUIRED: intervalOrFuncs.interval
			//OPTIONAL: intervalOrFuncs.end

			var
			// run.
			run,

			// start.
			start,

			// interval.
			interval,

			// end.
			end,

			// info
			info,

			// change fps.
			changeFPS,

			// remove.
			remove;

			// when intervalOrFuncs exists
			if (intervalOrFuncs !== undefined) {

				// init intervalOrFuncs.
				if (CHECK_IS_DATA(intervalOrFuncs) !== true) {
					interval = intervalOrFuncs;
				} else {
					start = intervalOrFuncs.start;
					interval = intervalOrFuncs.interval;
					end = intervalOrFuncs.end;
				}

				loopInfos.push( info = {
					fps : fps,
					start : start,
					interval : interval,
					end : end
				});

				self.changeFPS = changeFPS = function(fps) {
					//REQUIRED: fps

					info.fps = fps;
				};

				self.remove = remove = function() {

					REMOVE({
						array : loopInfos,
						value : info
					});

					stop();
				};
			}

			// when fps is run
			else {

				runs.push( run = fps);

				self.remove = remove = function() {

					REMOVE({
						array : runs,
						value : run
					});

					stop();
				};
			}

			fire();
		}
	};
});
