TEST('NODE', function(ok) {
	'use strict';

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
				style : {
					position : 'fixed',
					left : 40,
					top : 40
				},
				c : [img, text]
			});
			
			inner.setDom(div);
		}
	}),

	// node
	iat = ImageAndText({
		img : IMG({
			src : 'EXAMPLES/test.png'
		}),
		text : 'Hello, UPPERCASE.JS!'
	});

	iat.appendTo(BODY);

	// remove node after 3 seconds.
	DELAY(3, function() {
		iat.remove();
	});
});
