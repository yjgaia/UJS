/**
 * export img data.
 */
global.EXPORT_IMG_DATA = EXPORT_IMG_DATA = METHOD(function(m) {'use strict';

	var
	// exported img data set.
	exportedImgDataSet = {},

	// exporting callback map
	exportingCallbackMap = {};

	return {

		run : function(img, callback) {
			//REQUIRED: img
			//REQUIRED: callback

			var
			// uri
			uri = img.getSrc(),

			// exported img data
			exportedImgData = exportedImgDataSet[uri],

			// exporting callbacks
			exportingCallbacks = exportingCallbackMap[uri];

			// if aleady exported.
			if (exportedImgData !== undefined) {
				callback(exportedImgData);
			}

			// is processed uri.
			else if (exportingCallbacks !== undefined) {
				exportingCallbacks.push(callback);
			}

			// export img data.
			else {

				exportingCallbacks = exportingCallbackMap[uri] = [callback];

				EVENT_ONCE({
					node : IMG({
						src : uri
					}),
					name : 'load'
				}, function(e, img) {

					var
					// width
					width = img.getWidth(),

					// height
					height = img.getHeight(),

					// canvas
					canvas = CANVAS({
						width : width,
						height : height
					}),

					// context
					context = canvas.getContext(),

					// img data
					imgData;

					// draw img.
					context.drawImg({
						img : img
					});

					// get img data.
					imgData = context.getImgData();

					// cache.
					exportedImgDataSet[uri] = imgData;

					// run callbacks.
					EACH(exportingCallbacks, function(callback) {
						callback(imgData);
					});

					// clear exporting callbacks.
					delete exportingCallbackMap[uri];
				});
			}
		}
	};
});
