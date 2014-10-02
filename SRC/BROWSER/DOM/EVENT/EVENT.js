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
	removeAll,

	// remove.
	remove;

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
		events,

		// ret
		ret;

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

					var
					// b
					b = evt.fire();

					if (b === false) {
						ret = false;
					}
				});
			}
		}

		return ret;
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

	cls.remove = remove = function(params, eventHandler) {
		//REQUIRED: params
		//OPTIONAL: params.node
		//REQUIRED: params.name
		//REQUIRED: eventHandler

		var
		// node
		node = params.node,

		// name
		name = params.name,

		// node id
		nodeId,

		// event map
		eventMap,

		// events
		events;

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
					if (evt.getEventHandler() === eventHandler) {
						evt.remove();
					}
				});
			}
		}
	};

	return {

		init : function(inner, self, nameOrParams, eventHandler) {
			//REQUIRED: nameOrParams
			//OPTIONAL: nameOrParams.node
			//OPTIONAL: nameOrParams.lowNode
			//REQUIRED: nameOrParams.name
			//REQUIRED: eventHandler

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
			fire,
			
			// get event handler.
			getEventHandler;

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

				// when is touchable display or when is exists tap delay (300ms)
				if (INFO.checkIsTouchableDisplay() === true && INFO.checkIsNotExistsTapDelay() !== true) {

					eventLow1 = EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'touchstart'
					}, function(e) {

						if (e !== undefined) {

							startLeft = e.getLeft();
							startTop = e.getTop();
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

							if (startLeft - 5 <= left && left <= startLeft + 5 && startTop - 5 <= top && top <= startTop + 5) {

								e.stopDefault();

								return eventHandler(e, node);
							}
						}
					});

					self.remove = remove = function() {

						eventLow1.remove();
						eventLow2.remove();

						removeFromMap();
					};
				}

				// when is not touchable display or when is not exists tap delay (300ms)
				else {

					eventLow1 = EVENT_LOW({
						node : node,
						lowNode : lowNode,
						name : 'click'
					}, eventHandler);

					self.remove = remove = function() {

						eventLow1.remove();

						removeFromMap();
					};

				}
			}

			// double tap event (not exists, simulate.)
			else if (name === 'doubletap') {

				event1 = EVENT({
					node : node,
					name : 'tap'
				}, function(e) {

					if (lastTapTime === undefined) {
						lastTapTime = Date.now();
					} else {

						if (Date.now() - lastTapTime < 600) {
							eventHandler(e, node);
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

			// when is not touchable display, touchmove link to mousedown event
			else if (name === 'touchstart' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousedown'
				}, eventHandler);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			// when is not touchable display, touchmove link to mousemove event
			else if (name === 'touchmove' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mousemove'
				}, eventHandler);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			// when is not touchable display, touchend link to mouseup event
			else if (name === 'touchend' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseup'
				}, eventHandler);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			// mouse over event (when is touchable display, link to touchstart event.)
			else if (name === 'mouseover' && INFO.checkIsTouchableDisplay() === true) {

				// by touch
				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchstart'
				}, eventHandler);

				// by mouse
				eventLow2 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseover'
				}, eventHandler);

				self.remove = remove = function() {

					eventLow1.remove();
					eventLow2.remove();

					removeFromMap();
				};
			}

			// mouse out event (when is touchable display, link to touchend event.)
			else if (name === 'mouseout' && INFO.checkIsTouchableDisplay() === true) {

				// by touch
				eventLow1 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'touchend'
				}, eventHandler);

				// by mouse
				eventLow2 = EVENT_LOW({
					node : node,
					lowNode : lowNode,
					name : 'mouseout'
				}, eventHandler);

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

				eventLow1 = EVENT_LOW(nameOrParams, eventHandler);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();
				};
			}

			self.fire = fire = function() {

				// pass empty e object.
				return eventHandler(EMPTY_E(), node);
			};

			self.getEventHandler = getEventHandler = function() {
				return eventHandler;
			};
		}
	};
});
