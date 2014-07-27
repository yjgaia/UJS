var
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
	c : A({
		style : {
			textDecoration : 'underline'
		},
		c : 'WARNING: Close this window.',
		on : {
			tap : function() {
				CLOSE_WIN();
			}
		}
	})
}).appendTo(BODY);

// remove div after 3 seconds.
DELAY(3, function() {
	div.remove();
});
