var
// test view
TestView = CLASS({

	preset : function() {'use strict';
		return VIEW;
	},

	init : function(inner, self) {'use strict';

		var
		// on params change.
		onParamsChange,

		// close.
		close;

		// on view.
		console.log('View Opened!');

		self.onParamsChange = onParamsChange = function(params) {
			// when change params.
			console.log(params);
		};

		//OVERRIDE: self.close
		self.close = close = function() {
			// when close.
			console.log('View Closed!');
		};
	}
}),

// test div
div = DIV({
	style : {
		position : 'fixed',
		left : 40,
		top : 40,
		backgroundColor : 'red',
		padding : 20,
		margin : 0
	},
	c : [A({
		style : {
			textDecoration : 'underline'
		},
		c : 'test',
		on : {
			tap : function() {
				GO('test');
			}
		}
	}), BR(), A({
		style : {
			textDecoration : 'underline'
		},
		c : 'test/1',
		on : {
			tap : function() {
				GO('test/1');
			}
		}
	})]
}).appendTo(BODY);

// match view.
MATCH_VIEW({
	uris : ['test', 'test/{id}'],
	target : TestView
});

// remove div after 5 seconds.
DELAY(5, function() {
	div.remove();
});
