/**
 * Dom wrapper class
 */
global.DOM = DOM = CLASS({

	preset : function() {'use strict';
		return NODE;
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//OPTIONAL: params.tag
		//OPTIONAL: params.style
		//OPTIONAL: params.c
		//OPTIONAL: params.on
		//OPTIONAL: params.__TEXT

		var
		// tag
		tag = params.tag,

		// style
		style = params.style,

		// children
		children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c],

		// _on
		_on = params.on,

		// __TEXT
		__TEXT = params.__TEXT,

		// HTML Element
		el,

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

		// show handlers
		showHandlers = [],

		// remove handlers
		removeHandlers = [],

		// get el.
		getEl,

		// set el.
		setEl,

		// set attr.
		setAttr,

		// get dom.
		getDom,

		// add show handler.
		addShowHandler,

		// run show handlers.
		runShowHandlers,

		// add remove handler.
		addRemoveHandler,

		// run remove handlers.
		runRemoveHandlers,

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

		if (tag === 'body') {
			el = document.body;
		} else if (tag === '__STRING') {
			el = document.createTextNode(__TEXT);
		} else {
			el = document.createElement(tag);
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

		self.addShowHandler = addShowHandler = function(handler) {
			//REQUIRED: handler

			showHandlers.push(handler);
		};

		self.runShowHandlers = runShowHandlers = function() {

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

			EACH(showHandlers, function(handler) {
				handler();
			});
		};

		self.addRemoveHandler = addRemoveHandler = function(handler) {
			//REQUIRED: handler

			removeHandlers.push(handler);
		};

		self.runRemoveHandlers = runRemoveHandlers = function() {
			EACH(removeHandlers, function(handler) {
				handler();
			});
		};

		self.append = append = function(node) {
			//REQUIRED: node

			var
			// splits
			splits;

			if (CHECK_IS_DATA(node) === true) {

				el.appendChild(node.getDom().getEl());
				
				childDoms.push(node.getDom());
				node.setParent(self);
				
				node.getDom().runShowHandlers();

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

		if (children !== undefined) {
			EACH(children, function(child, i) {
				append(child);
			});
		}

		self.appendTo = appendTo = function(node) {
			//REQUIRED: node

			node.append(self);

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

				if (el.childNodes[0] === undefined) {
					el.appendChild(node.getDom().getEl());
				} else {
					el.insertBefore(node.getDom().getEl(), el.childNodes[0]);
				}

				childDoms.push(node.getDom());
				node.setParent(self);
				
				node.getDom().runShowHandlers();

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

			node.prepend(self);

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

					el.parentNode.insertBefore(node.getDom().getEl(), el.nextSibling);

					parentDom.getChildren().push(node.getDom());
					node.setParent(parentDom);

					node.getDom().runShowHandlers();

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

			node.after(self);

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

					el.parentNode.insertBefore(node.getDom().getEl(), el);

					parentDom.getChildren().push(node.getDom());
					node.setParent(parentDom);

					node.getDom().runShowHandlers();

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

			node.before(self);

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

				runRemoveHandlers();

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
			// style
			style = el.style[name];

			return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
		};

		if (style !== undefined) {
			addStyle(style);
		}

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

			if (getStyle('display') !== 'none') {

				originDisplay = getStyle('display');

				addStyle({
					display : 'none'
				});
			}
		};

		self.show = show = function() {

			if (originDisplay === undefined) {
				originDisplay = '';
			}

			addStyle({
				display : originDisplay
			});
		};

		self.checkIsShowing = checkIsShowing = function() {
			return getStyle('display') !== 'none';
		};

		if (_on !== undefined) {
			EACH(_on, function(func, name) {
				on(name, func);
			});
		}
	}
});
