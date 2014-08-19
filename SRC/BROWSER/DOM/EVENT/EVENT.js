/**
 * Event class
 */
global.EVENT = EVENT = CLASS(function(cls) {
	'use strict';

	var
	// event map
	eventMaps = {},

	// fire all.
	fireAll,

	// remove all.
	removeAll;

	cls.fireAll = fireAll = function(nameOrParams) {
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//REQUIRED: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			events = eventMap[name];

			if (events !== undefined) {

				EACH(events, function(evt) {
					evt.fire();
				});
			}
		}
	};

	cls.removeAll = removeAll = function(nameOrParams) {
		//OPTIONAL: nameOrParams
		//OPTIONAL: nameOrParams.node
		//OPTIONAL: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

		// init params.
		if (CHECK_IS_DATA(nameOrParams) !== true) {
			name = nameOrParams;
		} else {
			node = nameOrParams.node;
			name = nameOrParams.name;
		}

		if (node === undefined) {
			nodeId = 'body';
		} else {
			nodeId = node.id;
		}

		eventMap = eventMaps[nodeId];

		if (eventMap !== undefined) {

			if (name !== undefined) {

				events = eventMap[name];

				if (events !== undefined) {

					EACH(events, function(evt) {
						evt.remove();
					});
				}

			} else {

				EVENT(eventMap, function(events) {
					EACH(events, function(evt) {
						evt.remove();
					});
				});
			}
		}
	};

	return {

		init : function(inner, self, nameOrParams, func) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name
			//REQUIRED: func

			var
			// node
			node,

			// low node
			lowNode,

			// name
			name,

			// node id
			nodeId,

			// event lows
			eventLow1, eventLow2,

			// events
			event1,

			// touch start left, top
			startLeft, startTop,

			// last tap time
			lastTapTime,

			// remove from map.
			removeFromMap,

			// remove.
			remove,

			// fire.
			fire;

			// init params.
			if (CHECK_IS_DATA(nameOrParams) !== true) {
				name = nameOrParams;
			} else {
				node = nameOrParams.node;
				lowNode = nameOrParams.lowNode;
				name = nameOrParams.name;

				if (lowNode === undefined) {
					lowNode = node;
				}
			}

			if (node === undefined) {
				nodeId = 'body';
			} else {
				nodeId = node.id;
			}

			// push event to map.

			if (eventMaps[nodeId] === undefined) {
				eventMaps[nodeId] = {};
			}

			if (eventMaps[nodeId][name] === undefined) {
				eventMaps[nodeId][name] = [];
			}

			eventMaps[nodeId][name].push(self);

			removeFromMap = function() {

				REMOVE({
					array : eventMaps[nodeId][name],
					value : self
				});

				if (eventMaps[nodeId][name].length <= 0) {
					delete eventMaps[nodeId][name];
				}

				if (CHECK_IS_EMPTY_DATA(eventMaps[nodeId]) === true) {
					delete eventMaps[nodeId];
				}
			};

			// tap event (for remove click delay, simulate click event.)
			if (name === 'tap') {

				// if is touchable display.
				if (INFO.checkIsTouchableDisplay() === true) {

					eventLow1 = EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'touchstart'
					}, function(e) {

						if (e !== undefined) {

							startLeft = e.getLeft();
							startTop = e.getTop();

							e.stopBubbling();
						}
					});

					eventLow2 = EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'touchend'
					}, function(e, node) {

						var
						// left
						left,

						// top
						top;

						if (e !== undefined) {

							left = e.getLeft();
							top = e.getTop();

							e.stopDefault();

							if (startLeft - 5 <= left && left <= startLeft + 5 && startTop - 5 <= top && top <= startTop + 5) {
								return func(e, node);
							}
						}
					});

					self.remove = remove = function() {

						eventLow1.remove();
						eventLow2.remove();

						removeFromMap();
					};
				}

				// if is not touchable display.
				else {

					eventLow1 = EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'mousedown'
					}, function(e) {

						if (e !== undefined) {

							startLeft = e.getLeft();
							startTop = e.getTop();

							e.stopBubbling();
						}
					});

					eventLow2 = EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'mouseup'
					}, function(e, node) {

						var
						// left
						left,

						// top
						top;

						if (e !== undefined) {

							left = e.getLeft();
							top = e.getTop();

							e.stopDefault();

							if (startLeft - 5 <= left && left <= startLeft + 5 && startTop - 5 <= top && top <= startTop + 5) {
								return func(e, node);
							}
						}
					});

					self.remove = remove = function() {

						eventLow1.remove();
						eventLow2.remove();

						removeFromMap();
					};
				}
			}

			// double tap event (not exists, simulate.)
			if (name === 'doubletap') {

				event1 = EVENT({
					node : node,
					name : 'tap'
				}, function(e) {

					if (lastTapTime === undefined) {
						lastTapTime = Date.now();
					} else {

						if (Date.now() - lastTapTime < 600) {
							func(e, node);
						}

						lastTapTime = undefined;

						// clear text selections.
						getSelection().removeAllRanges();
					}
				});

				self.remove = remove = function() {

					event1.remove();

					removeFromMap();
				};
			}

			// if is not touchable display, touchmove link to mousedown event
			else if (name === 'touchstart' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousedown'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			// if is not touchable display, touchmove link to mousemove event
			else if (name === 'touchmove' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousemove'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			// if is not touchable display, touchend link to mouseup event
			else if (name === 'touchend' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseup'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			// mouse over event (if is touchable display, link to touchstart event.)
			else if (name === 'mouseover' && INFO.checkIsTouchableDisplay() === true) {

				// by touch
				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, func);

				// by mouse
				eventLow2 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseover'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();
					eventLow2.remove();

					removeFromMap();
				};
			}

			// mouse out event (if is touchable display, link to touchend event.)
			else if (name === 'mouseout' && INFO.checkIsTouchableDisplay() === true) {

				// by touch
				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, func);

				// by mouse
				eventLow2 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseout'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();
					eventLow2.remove();

					removeFromMap();
				};
			}

			// other events
			else if (name === 'attach' || name === 'show' || name === 'remove') {

				self.remove = remove = function() {
					removeFromMap();
				};
			}

			// other events
			else {

				eventLow1 = EVENT_LOW(nameOrParams, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			self.fire = fire = function() {

				// pass empty e object.
				func(EMPTY_E(), node);
			};
		}
	};
});
