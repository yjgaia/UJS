/**
 * Node interface
 */
global.NODE = NODE = CLASS({

	init : function(inner, self) {'use strict';

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

			self.getDom().on(eventName, eventHandler);
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

		// check is show.
		self.checkIsShow = function() {
			return self.getDom().checkIsShow();
		};
	}
});
