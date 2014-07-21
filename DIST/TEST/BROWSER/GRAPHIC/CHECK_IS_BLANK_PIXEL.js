/**
 * IE6 ~ IE8 need Flash Player.
 */

var
// img
img,

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
	c :

	// img
	img = IMG({
		src : 'logo.png'
	})
}).appendTo(BODY);

// check is blank pixel 10 x 10.
CHECK_IS_BLANK_PIXEL({
	img : img,
	left : 10,
	top : 10
}, function(result) {
	console.log('left:10 top:10 pixel is blank?:', result);
});

// check is blank pixel 70 x 40.
CHECK_IS_BLANK_PIXEL({
	img : img,
	left : 70,
	top : 40
}, function(result) {
	console.log('left:70 top:40 pixel is blank?:', result);
});

// remove div after 3 seconds.
DELAY(3, function() {
	div.remove();
});

