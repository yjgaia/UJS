var
// new node type
ImageAndText = CLASS({

	preset : function() {
		return NODE;
	},

	init : function(inner, self, params) {
		//REQUIRED: params
		//REQUIRED: params.img
		//REQUIRED: params.text

		var
		// img
		img = params.img,

		// text
		text = params.text,

		// div
		div = DIV({
			c : [img, text]
		}),

		// get dom.
		getDom;

		self.getDom = getDom = function() {
			return div;
		};
	}
}),

// node
iat = ImageAndText({
	img : IMG({
		src : 'logo.png'
	}),
	text : 'Hello, UPPERCASE.JS!'
});

iat.appendTo(BODY);

// remove node after 3 seconds.
DELAY(3, function() {
	iat.remove();
});
