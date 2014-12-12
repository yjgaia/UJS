/**
 * Node interface
 */
global.NODE = NODE = CLASS(function() {
	'use strict';

	var
	// parent nodes
	parentNodes = [];

	return {

		init : function(inner, self) {

			var
			// wrapper dom
			wrapperDom,

			// content dom
			contentDom,

			// wrapper el
			wrapperEl,

			// content el
			contentEl,

			// waiting after nodes
			waitingAfterNodes,

			// waiting before nodes
			waitingBeforeNodes,

			// parent node
			parentNode,

			// child nodes
			childNodes = [],

			// origin display
			originDisplay,

			// set wrapper dom.
			setWrapperDom,

			// set content dom.
			setContentDom,

			// set dom.
			setDom,

			// get wrapper dom.
			getWrapperDom,

			// get content dom.
			getContentDom,

			// get wrapper el.
			getWrapperEl,

			// get content el.
			getContentEl,

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

			// get children.
			getChildren,

			// on.
			on,

			// off.
			off,

			// add style.
			addStyle,

			// get style.
			getStyle,

			// get width.
			getWidth,

			// get inner width.
			getInnerWidth,

			// get height.
			getHeight,

			// get inner height.
			getInnerHeight,

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

			inner.setWrapperDom = setWrapperDom = function(dom) {
				//REQUIRED: dom

				wrapperDom = dom;
				wrapperEl = dom.getEl();

				originDisplay = getStyle('display');

				on('show', function() {

					EACH(childNodes, function(childNode) {

						if (childNode.checkIsShowing() === true) {

							EVENT.fireAll({
								node : childNode,
								name : 'show'
							});

							EVENT.removeAll({
								node : childNode,
								name : 'show'
							});
						}
					});
				});
			};

			inner.setContentDom = setContentDom = function(dom) {
				//REQUIRED: dom

				contentDom = dom;
				contentEl = dom.getEl();
			};

			inner.setDom = setDom = function(dom) {
				//REQUIRED: dom

				setWrapperDom(dom);
				setContentDom(dom);
			};

			self.getWrapperDom = getWrapperDom = function() {
				return wrapperDom;
			};

			self.getContentDom = getContentDom = function() {
				return contentDom;
			};

			self.getWrapperEl = getWrapperEl = function() {
				return wrapperEl;
			};

			self.getContentEl = getContentEl = function() {
				return contentEl;
			};

			attach = function(node) {
				//REQUIRED: node

				setParent(node);

				parentNode.getChildren().push(self);

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

				// append child.
				if (CHECK_IS_DATA(node) === true) {
					node.appendTo(self);
				}

				// append textarea content.
				else if (self.type === TEXTAREA) {

					append(DOM({
						tag : '__STRING',
						__TEXT : String(node)
					}));
				}

				// append string.
				else {

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

				node.getContentEl().appendChild(wrapperEl);

				attach(node);

				return self;
			};

			self.prepend = prepend = function(node) {
				//REQUIRED: node

				var
				// splits
				splits;

				// prepend child.
				if (CHECK_IS_DATA(node) === true) {
					node.prependTo(self);
				}

				// prepend textarea content.
				else if (self.type === TEXTAREA) {

					prepend(DOM({
						tag : '__STRING',
						__TEXT : String(node)
					}));
				}

				// prepend string.
				else {

					splits = String(node).split('\n');

					REPEAT({
						start : splits.length - 1,
						end : 0
					}, function(i) {

						prepend(DOM({
							tag : '__STRING',
							__TEXT : splits[i]
						}));

						if (i < splits.length - 1) {
							prepend(BR());
						}
					});
				}
			};

			self.prependTo = prependTo = function(node) {
				//REQUIRED: node

				var
				// parent el
				parentEl = node.getContentEl();

				if (parentEl.childNodes[0] === undefined) {
					parentEl.appendChild(wrapperEl);
				} else {
					parentEl.insertBefore(wrapperEl, parentEl.childNodes[0]);
				}

				attach(node);

				return self;
			};

			self.after = after = function(node) {
				//REQUIRED: node

				var
				// splits
				splits;

				// wait after node.
				if (wrapperEl.parentNode === TO_DELETE) {

					if (waitingAfterNodes === undefined) {
						waitingAfterNodes = [];
					}

					waitingAfterNodes.push(node);
				}

				// after node.
				else {

					// after child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertAfter(self);
					}

					// after textarea content.
					else if (tag === 'textarea') {

						after(DOM({
							tag : '__STRING',
							__TEXT : String(node)
						}));
					}

					// after string.
					else {

						splits = String(node).split('\n');

						REPEAT({
							start : splits.length - 1,
							end : 0
						}, function(i) {

							after(DOM({
								tag : '__STRING',
								__TEXT : splits[i]
							}));

							if (i < splits.length - 1) {
								after(BR());
							}
						});
					}
				}
			};

			self.insertAfter = insertAfter = function(node) {
				//REQUIRED: node

				var
				// before el
				beforeEl = node.getWrapperEl();

				beforeEl.parentNode.insertBefore(wrapperEl, beforeEl.nextSibling);

				attach(node.getParent());

				return self;
			};

			self.before = before = function(node) {
				//REQUIRED: node

				var
				// splits
				splits;

				// wait before node.
				if (wrapperEl.parentNode === TO_DELETE) {

					if (waitingBeforeNodes === undefined) {
						waitingBeforeNodes = [];
					}

					waitingBeforeNodes.push(node);
				}

				// before node.
				else {

					// before child.
					if (CHECK_IS_DATA(node) === true) {
						node.insertBefore(self);
					}

					// before textarea content.
					else if (tag === 'textarea') {

						before(DOM({
							tag : '__STRING',
							__TEXT : String(node)
						}));
					}

					// before string.
					else {

						splits = String(node).split('\n');

						EACH(splits, function(text, i) {

							before(DOM({
								tag : '__STRING',
								__TEXT : text
							}));

							if (i < splits.length - 1) {
								before(BR());
							}
						});
					}
				}
			};

			self.insertBefore = insertBefore = function(node) {
				//REQUIRED: node

				var
				// after el
				afterEl = node.getWrapperEl();

				afterEl.parentNode.insertBefore(wrapperEl, afterEl);

				attach(node.getParent());

				return self;
			};

			self.remove = remove = function() {

				if (wrapperEl !== undefined && wrapperEl.parentNode !== TO_DELETE) {

					// empty children.
					empty();

					// remove from parent node.
					wrapperEl.parentNode.removeChild(wrapperEl);

					REMOVE({
						array : parentNode.getChildren(),
						value : self
					});

					setParent(undefined);

					// fire remove event.
					EVENT.fireAll({
						node : self,
						name : 'remove'
					});

					EVENT.removeAll({
						node : self
					});

					wrapperEl = undefined;
					contentEl = undefined;
				}
			};

			self.empty = empty = function() {
				EACH(childNodes, function(child) {
					child.remove();
				});
			};

			self.getParent = getParent = function() {
				return parentNode;
			};

			self.setParent = setParent = function(node) {
				//OPTIONAL: node

				parentNode = node;
			};

			self.getChildren = getChildren = function() {
				return childNodes;
			};

			self.on = on = function(eventName, eventHandler) {
				//REQUIRED: eventName
				//REQUIRED: eventHandler

				EVENT({
					node : self,
					name : eventName
				}, eventHandler);
			};

			self.off = off = function(eventName, eventHandler) {
				//REQUIRED: eventName
				//OPTIONAL: eventHandler

				if (eventHandler !== undefined) {

					EVENT.remove({
						node : self,
						name : eventName
					}, eventHandler);

				} else {

					EVENT.removeAll({
						node : self,
						name : eventName
					});
				}
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
				// styles
				styles,

				// style
				style;

				if (wrapperEl !== undefined) {

					styles = wrapperEl.style;

					if (styles !== undefined) {

						style = styles[name];

						return style === '' ? undefined : (style.substring(style.length - 2) === 'px' ? REAL(style) : style);
					}
				}
			};

			self.getWidth = getWidth = function() {
				return wrapperEl.offsetWidth;
			};

			self.getInnerWidth = getInnerWidth = function() {
				return wrapperEl.clientWidth;
			};

			self.getHeight = getHeight = function() {
				return wrapperEl.offsetHeight;
			};

			self.getInnerHeight = getInnerHeight = function() {
				return wrapperEl.clientHeight;
			};

			self.getLeft = getLeft = function() {

				var
				// left
				left = 0,

				// parent el
				parentEl = wrapperEl;

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
				parentEl = wrapperEl;

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

				if (wrapperEl === document.body) {
					return true;
				} else {
					return parentNode !== undefined && parentNode.checkIsShowing() === true && getStyle('display') !== 'none';
				}
			};
		},

		afterInit : function(inner, self, params, generateChildren) {
			//OPTIONAL: params
			//OPTIONAL: params.tag
			//OPTIONAL: params.style
			//OPTIONAL: params.c
			//OPTIONAL: params.on
			//OPTIONAL: generateChildren

			var
			// tag
			tag,

			// style
			style,

			// children
			children,

			// on
			on,

			// parent nodes length
			parentNodesLength = parentNodes.length,

			// generate children result
			generateChildrenResult;

			// init params.
			if (params !== undefined) {

				if (CHECK_IS_DATA(params) === true) {

					tag = params.tag;
					style = params.style;
					children = params.c === undefined || CHECK_IS_ARRAY(params.c) === true ? params.c : [params.c];
					on = params.on;

				} else if (generateChildren === undefined) {
					generateChildren = params;
				}
			}

			if (style !== undefined) {
				self.addStyle(style);
			}

			if (on !== undefined) {
				EACH(on, function(handler, name) {
					self.on(name, handler);
				});
			}

			if (children !== undefined) {
				EACH(children, function(child, i) {
					self.append(child);
				});
			}

			// when parent node exists, when tag is not __STRING.
			if (parentNodesLength > 0 && tag !== '__STRING') {
				self.appendTo(parentNodes[parentNodesLength - 1]);
			}

			if (generateChildren !== undefined) {

				parentNodes.push(self);

				generateChildrenResult = generateChildren();

				// append __STRING.
				if (generateChildrenResult !== undefined && CHECK_IS_DATA(generateChildrenResult) !== true) {
					self.append(generateChildrenResult);
				}

				parentNodes.pop();
			}
		}
	};
});
