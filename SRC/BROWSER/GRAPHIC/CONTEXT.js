/**
 * Context for canvas wrapper class
 */
global.CONTEXT = CLASS({

	init : function(inner, self, canvas) {
		'use strict';
		//REQUIRED: canvas

		var
		// native context
		nativeContext = canvas.getEl().getContext('2d'),

		// get native context.
		getNativeContext,

		// draw img.
		drawImg,

		// get img data.
		getImgData,

		// create image data.
		createImgData,

		// put image data.
		putImgData,

		// set scale.
		setScale,

		// rotate.
		rotate,

		// save.
		save,

		// restore.
		restore,

		// clear.
		clear;

		inner.getNativeContext = getNativeContext = function() {
			return nativeContext;
		};

		self.drawImg = drawImg = function(params) {
			//REQUIRED: params
			//REQUIRED: params.img
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			//OPTIONAL: params.clipLeft
			//OPTIONAL: params.clipTop
			//OPTIONAL: params.clipWidth
			//OPTIONAL: params.clipHeight
			//OPTIONAL: params.width
			//OPTIONAL: params.height

			var
			// img
			img = params.img,

			// left
			left = params.left === undefined ? 0 : params.left,

			// top
			top = params.top === undefined ? 0 : params.top,

			// clip left
			clipLeft = params.clipLeft !== undefined ? params.clipLeft : 0,

			// clip top
			clipTop = params.clipTop !== undefined ? params.clipTop : 0,

			// clip width
			clipWidth = params.clipWidth,

			// clip height
			clipHeight = params.clipHeight,

			// width
			width = params.width,

			// height
			height = params.height,

			// scale
			scale = img.checkIsX2() === true ? 2 : 1;

			if (clipWidth === undefined && clipHeight === undefined) {
				if (width > 0 && height > 0) {
					nativeContext.drawImage(img.getEl(), left, top, width, height);
				} else {
					nativeContext.drawImage(img.getEl(), left, top);
				}
			} else {

				if (clipWidth === undefined) {
					clipWidth = img.getWidth();
				}
				if (clipHeight === undefined) {
					clipHeight = img.getHeight();
				}

				nativeContext.drawImage(img.getEl(), clipLeft * scale, clipTop * scale, clipWidth * scale, clipHeight * scale, left, top, width, height);
			}
		};

		self.getImgData = getImgData = function(params) {
			//OPTIONAL: params
			//OPTIONAL: params.left
			//OPTIONAL: params.top
			//OPTIONAL: params.width
			//OPTIONAL: params.height

			var
			// left
			left = params === undefined || params.left === undefined ? 0 : params.left,

			// top
			top = params === undefined || params.top === undefined ? 0 : params.top,

			// width
			width = params === undefined || params.width === undefined ? canvas.getWidth() : params.width,

			// height
			height = params === undefined || params.height === undefined ? canvas.getHeight() : params.height;

			return nativeContext.getImageData(left, top, width, height);
		};

		self.createImgData = createImgData = function(params) {
			//REQUIRED: params
			//REQUIRED: params.width
			//REQUIRED: params.height

			var
			// width
			width = params.width,

			// height
			height = params.height;

			return nativeContext.createImageData(width, height);
		};

		self.putImgData = putImgData = function(params) {
			//REQUIRED: params
			//REQUIRED: params.data
			//OPTIONAL: params.left
			//OPTIONAL: params.top

			var
			// data
			data = params.data,

			// left
			left = params.left === undefined ? 0 : params.left,

			// top
			top = params.top === undefined ? 0 : params.top;

			nativeContext.putImageData(data, left, top);
		};

		self.setScale = setScale = function(scaleSize) {
			//REQUIRED: scaleSize
			//OPTIONAL: scaleSize.scaleWidth
			//OPTIONAL: scaleSize.scaleHeight

			var
			// scale width
			scaleWidth = scaleSize.scaleWidth,

			// scale height
			scaleHeight = scaleSize.scaleHeight;

			nativeContext.scale(scaleWidth, scaleHeight);
		};

		self.rotate = rotate = function(params) {
			//REQUIRED: params
			//REQUIRED: params.centerLeft
			//REQUIRED: params.centerTop
			//REQUIRED: params.degree

			var
			// center left
			centerLeft = params.centerLeft,

			// center top
			centerTop = params.centerTop,

			// degree
			degree = params.degree;

			// Move registration point to the center of the canvas
			nativeContext.translate(centerLeft, centerTop);

			// Rotate degree
			nativeContext.rotate(degree * Math.PI / 180);

			// Move registration point back to the top left corner of canvas
			nativeContext.translate(-centerLeft, -centerTop);
		};

		self.save = save = function() {
			nativeContext.save();
		};

		self.restore = restore = function() {
			nativeContext.restore();
		};

		self.clear = clear = function() {
			nativeContext.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
		};
	}
});
