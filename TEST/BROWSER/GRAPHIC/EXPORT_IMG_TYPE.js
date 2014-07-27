/**
 * IE6 ~ IE8 need Flash Player.
 */

var
// imgs
img1, img2,

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
	c : [

	// img1
	img1 = IMG({
		src : 'TEST/BROWSER/GRAPHIC/tricoloring.png'
	}), BR(),
	
	// img2
	img2 = IMG({
		src : 'TEST/BROWSER/GRAPHIC/stonehenge.jpg'
	})]
}).appendTo(BODY);

// export img1 type.
EXPORT_IMG_TYPE(img1, function(imgType) {
	console.log(imgType);
});

// export img2 type.
EXPORT_IMG_TYPE(img2, function(imgType) {
	console.log(imgType);
});

// remove div after 3 seconds.
DELAY(3, function() {
	div.remove();
});
