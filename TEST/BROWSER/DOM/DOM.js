var
// new dom
dom = DOM({

	// tag name
	tag : 'div',

	// css style
	style : {
		color : 'red'
	},

	// chidren doms
	c : 'test',

	// events
	on : {

		// mouse click or mobile touch
		tap : function() {
			console.log('tapped new dom!');
		}
	}
}),

// before dom
beforeDom,

// after dom
afterDom,

// blink interval
blinkInterval;

// append child dom.
dom.append(DOM({
	tag : 'p',
	c : 'This is appended child.'
}));

// prepend child dom.
dom.prepend(DOM({
	tag : 'p',
	c : 'This is prepended child.'
}));

// add show handler.
dom.addShowHandler(function() {
	console.log('I\'m comming!');
});

// attach dom.
dom.appendTo(BODY);

// before dom.
dom.before( beforeDom = DOM({
	tag : 'p',
	c : 'This is before dom.'
}));

// after dom.
dom.after( afterDom = DOM({
	tag : 'p',
	c : 'This is after dom.'
}));

// add style.
dom.addStyle({
	border : '5px solid blue'
});

// get style.
console.log(dom.getStyle('color'));

// get size.
console.log(dom.getWidth(), dom.getHeight());

// get position.
console.log(dom.getLeft(), dom.getTop());

// blink dom.
blinkInterval = INTERVAL(1, function() {

	if (dom.checkIsShow() === true) {
		dom.hide();
	} else {
		dom.show();
	}
});

// add remove handler.
dom.addRemoveHandler(function() {

	console.log('Bye!');

	beforeDom.remove();
	afterDom.remove();

	blinkInterval.remove();
});

// remove dom after 5 seconds.
DELAY(5, function() {
	dom.remove();
});
