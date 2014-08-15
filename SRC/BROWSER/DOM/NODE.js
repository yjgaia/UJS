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

			// get dom.
			self.getDom = function() {
				// to implement (must!)
			};

			// add show handler.
			self.addShowHandler = function(handler) {
				//REQUIRED: handler

				self.getDom().addShowHandler(handler);
			};

			// run show handlers.
			self.runShowHandlers = function() {
				self.getDom().runShowHandlers();
			};

			// add remove handler.
			self.addRemoveHandler = function(handler) {
				//REQUIRED: handler

				self.getDom().addRemoveHandler(handler);
			};

			// run remove handlers.
			self.runRemoveHandlers = function() {
				self.getDom().runRemoveHandlers();
			};

			// append.
			self.append = function(node) {
				//REQUIRED: node

				self.getDom().append(node);
			};

			// append to.
			self.appendTo = function(node) {
				//REQUIRED: node

				self.getDom().appendTo(node);

				return self;
			};

			// prepend.
			self.prepend = function(node) {
				//REQUIRED: node

				self.getDom().prepend(node);
			};

			// prepend to.
			self.prependTo = function(node) {
				//REQUIRED: node

				self.getDom().prependTo(node);

				return self;
			};

			// after.
			self.after = function(node) {
				//REQUIRED: node

				self.getDom().after(node);
			};

			// insert after.
			self.insertAfter = function(node) {
				//REQUIRED: node

				self.getDom().insertAfter(node);

				return self;
			};

			// before.
			self.before = function(node) {
				//REQUIRED: node

				self.getDom().before(node);
			};

			// insert before.
			self.insertBefore = function(node) {
				//REQUIRED: node

				self.getDom().insertBefore(node);

				return self;
			};

			// remove.
			self.remove = function() {
				self.getDom().remove();
			};

			// empty.
			self.empty = function() {
				self.getDom().empty();
			};

			// get parent.
			self.getParent = function() {
				return self.getDom().getParent();
			};

			// set parent.
			self.setParent = function(parent) {
				//REQUIRED: parent

				self.getDom().setParent(parent);
			};

			// get children.
			self.getChildren = function() {
				return self.getDom().getChildren();
			};

			// on.
			self.on = function(eventName, eventHandler) {
				//REQUIRED: eventName
				//REQUIRED: eventHandler

				self.getDom().on(eventName, function(e) {
					eventHandler(e, self);
				});
			};

			// add style.
			self.addStyle = function(style) {
				//REQUIRED: style

				self.getDom().addStyle(style);
			};

			// get style.
			self.getStyle = function(name) {
				//REQUIRED: name

				self.getDom().getStyle(name);
			};

			// get width.
			self.getWidth = function() {
				return self.getDom().getWidth();
			};

			// get height.
			self.getHeight = function() {
				return self.getDom().getHeight();
			};

			// get left.
			self.getLeft = function() {
				return self.getDom().getLeft();
			};

			// get top.
			self.getTop = function() {
				return self.getDom().getTop();
			};

			// hide.
			self.hide = function() {
				self.getDom().hide();
			};

			// show.
			self.show = function() {
				self.getDom().show();
			};

			// check is showing.
			self.checkIsShowing = function() {
				return self.getDom().checkIsShowing();
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
