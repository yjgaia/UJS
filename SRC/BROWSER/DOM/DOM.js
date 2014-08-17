/**
 * Dom wrapper class
 */
global.DOM = DOM = CLASS({

	preset : function() {
		'use strict';

		return NODE;
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.tag
		//OPTIONAL: params.style
		//OPTIONAL: params.c
		//OPTIONAL: params.on
		//OPTIONAL: params.__TEXT
		//OPTIONAL: params.el

		var
		// tag
		tag = params.tag,

		// __TEXT
		__TEXT = params.__TEXT,

		// HTML Element
		el = params.el,

		// waiting after nodes
		waitingAfterNodes,

		// waiting before nodes
		waitingBeforeNodes,

		// parent dom
		parentDom,

		// child doms
		childDoms = [],

		// origin display
		originDisplay,

		// get el.
		getEl,

		// set el.
		setEl,

		// set attr.
		setAttr,

		// get dom.
		getDom,

		// attach.
		attach,

		// append.
		append,

		// append to.
		appendTo,

		// prepend.
		prepend,

		// prepend to.
		prependTo,

		// after.
		after,

		// insert after.
		insertAfter,

		// before.
		before,

		// insert before.
		insertBefore,

		// remove.
		remove,

		// empty.
		empty,

		// get parent.
		getParent,

		// set parent.
		setParent,

		// get children
		getChildren,

		// on.
		on,

		// add style.
		addStyle,

		// get style.
		getStyle,

		// get width.
		getWidth,

		// get height.
		getHeight,

		// get left.
		getLeft,

		// get top.
		getTop,

		// hide.
		hide,

		// show.
		show,

		// check is showing.
		checkIsShowing;

		// when tag is not undefined
		if (tag !== undefined) {

			if (tag === 'body') {
				el = document.body;
			} else if (tag === '__STRING') {
				el = document.createTextNode(__TEXT);
			} else {
				el = document.createElement(tag);
			}
		}

		// when tag is undefined, el is not undefined
		else if (el !== document.body && el.parentNode !== TO_DELETE) {

			parentDom = DOM({
				el : el.parentNode
			});
		}

		self.getEl = getEl = function() {
			return el;
		};

		inner.setEl = setEl = function(_el) {
			//REQUIRED: _el

			el = _el;
		};

		inner.setAttr = setAttr = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			var
			// name
			name = params.name,

			// value
			value = params.value;

			el.setAttribute(name, value);
		};

		self.getDom = getDom = function() {
			return self;
		};

		attach = function(parentDom) {
			//REQUIRED: parent dom

			parentDom.getChildren().push(self);
			setParent(parentDom);

			EVENT.fireAll({
				node : self,
				name : 'attach'
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}

			// run after wating after nodes.
			if (waitingAfterNodes !== undefined) {
				EACH(waitingAfterNodes, function(node) {
					after(node);
				});
			}

			// run before wating before nodes.
			if (waitingBeforeNodes !== undefined) {
				EACH(waitingBeforeNodes, function(node) {
					before(node);
				});
			}
		};

		self.append = append = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			if (CHECK_IS_DATA(node) === true) {

				node.appendTo(self);

			} else if (tag === 'textarea') {

				append(DOM({
					tag : '__STRING',
					__TEXT : String(node)
				}));

			} else {

				splits = String(node).split('\n');

				EACH(splits, function(text, i) {
					append(DOM({
						tag : '__STRING',
						__TEXT : text
					}));
					if (i < splits.length - 1) {
						append(BR());
					}
				});
			}
		};

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node

			node.getDom().getEl().appendChild(el);

			attach(node);

			return self;
		};

		self.prepend = prepend = function(node) {
			//REQUIRED: node

			var
			// splits
			splits,

			// extras
			i;

			if (CHECK_IS_DATA(node) === true) {

				node.prependTo(self);

			} else if (tag === 'textarea') {

				prepend(DOM({
					tag : '__STRING',
					__TEXT : String(node)
				}));

			} else {

				splits = String(node).split('\n');

				for ( i = splits.length - 1; i >= 0; i -= 1) {
					prepend(DOM({
						tag : '__STRING',
						__TEXT : splits[i]
					}));
					if (i < splits.length - 1) {
						prepend(BR());
					}
				}
			}
		};

		self.prependTo = prependTo = function(node) {
			//REQUIRED: node

			var
			// parent el
			parentEl = node.getDom().getEl();

			if (parentEl.childNodes[0] === undefined) {
				parentEl.appendChild(el);
			} else {
				parentEl.insertBefore(el, parentEl.childNodes[0]);
			}

			attach(node);

			return self;
		};

		self.after = after = function(node) {
			//REQUIRED: node

			var
			// splits
			splits,

			// dom
			dom,

			// extras
			i;

			if (el.parentNode === TO_DELETE) {

				if (waitingAfterNodes === undefined) {
					waitingAfterNodes = [];
				}
				waitingAfterNodes.push(node);

			} else {

				if (CHECK_IS_DATA(node) === true) {

					node.insertAfter(self);

				} else if (tag === 'textarea') {

					after(DOM({
						tag : '__STRING',
						__TEXT : String(node)
					}));

				} else {

					splits = String(node).split('\n');

					for ( i = splits.length - 1; i >= 0; i -= 1) {

						dom = DOM({
							tag : '__STRING',
							__TEXT : splits[i]
						});

						after(dom);

						if (i < splits.length - 1) {

							dom = BR();

							after(dom);
						}
					}
				}
			}
		};

		self.insertAfter = insertAfter = function(node) {
			//REQUIRED: node

			var
			// after el
			afterEl = node.getDom().getEl();

			afterEl.parentNode.insertBefore(el, afterEl.nextSibling);

			attach(node.getParent());

			return self;
		};

		self.before = before = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			if (el.parentNode === TO_DELETE) {

				if (waitingBeforeNodes === undefined) {
					waitingBeforeNodes = [];
				}
				waitingBeforeNodes.push(node);

			} else {

				if (CHECK_IS_DATA(node) === true) {

					node.insertBefore(self);

				} else if (tag === 'textarea') {

					before(DOM({
						tag : '__STRING',
						__TEXT : String(node)
					}));

				} else {

					splits = String(node).split('\n');

					EACH(splits, function(text, i) {

						var
						// dom
						dom = DOM({
							tag : '__STRING',
							__TEXT : text
						});

						before(dom);

						if (i < splits.length - 1) {

							dom = BR();

							before(dom);
						}
					});
				}
			}
		};

		self.insertBefore = insertBefore = function(node) {
			//REQUIRED: node

			var
			// after el
			afterEl = node.getDom().getEl();

			afterEl.parentNode.insertBefore(el, afterEl);

			attach(node.getParent());

			return self;
		};

		self.remove = remove = function() {

			if (el.parentNode !== TO_DELETE) {

				empty();

				el.parentNode.removeChild(el);

				REMOVE({
					array : parentDom.getChildren(),
					value : self
				});
				setParent(undefined);

				EVENT.fireAll({
					node : self,
					name : 'remove'
				});

				EVENT.removeAll({
					node : self
				});

				el = undefined;
			}
		};

		self.empty = empty = function() {
			EACH(childDoms, function(child) {
				child.remove();
			});
		};

		self.getParent = getParent = function() {
			return parentDom;
		};

		self.setParent = setParent = function(_parentDom) {
			//REQUIRED: _parentDom

			parentDom = _parentDom;
		};

		self.getChildren = getChildren = function() {
			return childDoms;
		};

		self.on = on = function(eventName, eventHandler) {
			//REQUIRED: eventName
			//REQUIRED: eventHandler

			EVENT({
				node : self,
				name : eventName
			}, eventHandler);
		};

		on('show', function() {

			DELAY(function() {

				EACH(childDoms, function(childDom) {

					if (childDom.checkIsShowing() === true) {

						EVENT.fireAll({
							node : childDom,
							name : 'show'
						});

						EVENT.removeAll({
							node : childDom,
							name : 'show'
						});
					}
				});
			});
		});

		self.addStyle = addStyle = function(style) {
			//REQUIRED: style

			ADD_STYLE({
				node : self,
				style : style
			});
		};

		self.getStyle = getStyle = function(name) {
			//REQUIRED: name

			var
			// styles
			styles = el.style,

			// style
			style;

			if (styles !== undefined) {

				style = styles[name];

				return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
			}
		};

		originDisplay = getStyle('display');

		self.getWidth = getWidth = function() {
			return el.offsetWidth;
		};

		self.getHeight = getHeight = function() {
			return el.offsetHeight;
		};

		self.getLeft = getLeft = function() {

			var
			// left
			left = 0,

			// parent el
			parentEl = el;

			do {
				left += parentEl.offsetLeft - (parentEl === document.body ? 0 : parentEl.scrollLeft);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return left;
		};

		self.getTop = getTop = function() {

			var
			// top
			top = 0,

			// parent el
			parentEl = el;

			do {
				top += parentEl.offsetTop - (parentEl === document.body ? 0 : parentEl.scrollTop);
				parentEl = parentEl.offsetParent;
			} while (parentEl !== TO_DELETE);

			return top;
		};

		self.hide = hide = function() {

			addStyle({
				display : 'none'
			});
		};

		self.show = show = function() {

			addStyle({
				display : originDisplay === undefined ? '' : originDisplay
			});

			if (checkIsShowing() === true) {

				EVENT.fireAll({
					node : self,
					name : 'show'
				});

				EVENT.removeAll({
					node : self,
					name : 'show'
				});
			}
		};

		self.checkIsShowing = checkIsShowing = function() {

			if (el === document.body) {
				return true;
			} else {
				return parentDom !== undefined && parentDom.checkIsShowing() === true && getStyle('display') !== 'none';
			}
		};
	}
});
