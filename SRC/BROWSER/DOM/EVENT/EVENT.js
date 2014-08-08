/**
 * Event class
 */
global.EVENT = EVENT = CLASS(function(cls) {
	'use strict';

	var
	// event map
	eventMap = {},

	// get event map.
	getEventMap;

	cls.getEventMap = getEventMap = function() {
		return eventMap;
	};

	return {

		init : function(inner, self, params, func) {
			//REQUIRED: params
			//OPTIONAL: params.node
			//REQUIRED: params.name
			//REQUIRED: func

			var
			// node
			node = params.node,

			// name
			name = params.name,

			// node id
			nodeId = node === undefined ? 'body' : node.id,

			// event lows
			eventLow1, eventLow2,

			// events
			event1,

			// touch start left, top
			startLeft, startTop,

			// last tap time
			lastTapTime,

			// is removed
			isRemoved,

			// remove from map.
			removeFromMap,

			// remove.
			remove,

			// fire.
			fire;

			// push event to map.

			if (eventMap[nodeId] === undefined) {
				eventMap[nodeId] = {};
			}

			if (eventMap[nodeId][name] === undefined) {
				eventMap[nodeId][name] = [];
			}

			eventMap[nodeId][name].push(self);

			removeFromMap = function() {

				REMOVE({
					data : eventMap[nodeId][name],
					value : self
				});

				if (eventMap[nodeId][name].length <= 0) {
					delete eventMap[nodeId][name];
				}

				if (CHECK_IS_EMPTY_DATA(eventMap[nodeId]) === true) {
					delete eventMap[nodeId];
				}
			};

			// tap event
			if (name === 'tap') {

				eventLow1 = EVENT_LOW({
					node : node,
					name : 'click'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
				};
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

					isRemoved = true;
				};

				self.fire = fire = function() {
					event1.fire();
				};
			}

			// if is not touchable display, touchmove link to mousedown event
			else if (name === 'touchstart' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					name : 'mousedown'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
				};
			}

			// if is not touchable display, touchmove link to mousemove event
			else if (name === 'touchmove' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					name : 'mousemove'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
				};
			}

			// if is not touchable display, touchend link to mouseup event
			else if (name === 'touchend' && INFO.checkIsTouchableDisplay() !== true) {

				eventLow1 = EVENT_LOW({
					node : node,
					name : 'mouseup'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
				};
			}

			// mouse over event (if is touchable display, link to touchstart event.)
			else if (name === 'mouseover' && INFO.checkIsTouchableDisplay() === true) {

				// by touch
				eventLow1 = EVENT_LOW({
					node : node,
					name : 'touchstart'
				}, func);

				// by mouse
				eventLow2 = EVENT_LOW({
					node : node,
					name : 'mouseover'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();
					eventLow2.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
					eventLow2.fire();
				};
			}

			// mouse out event (if is touchable display, link to touchend event.)
			else if (name === 'mouseout' && INFO.checkIsTouchableDisplay() === true) {

				// by touch
				eventLow1 = EVENT_LOW({
					node : node,
					name : 'touchend'
				}, func);

				// by mouse
				eventLow2 = EVENT_LOW({
					node : node,
					name : 'mouseout'
				}, func);

				self.remove = remove = function() {

					eventLow1.remove();
					eventLow2.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
					eventLow2.fire();
				};
			}

			// other events
			else {

				eventLow1 = EVENT_LOW(params, func);

				self.remove = remove = function() {

					eventLow1.remove();

					removeFromMap();

					isRemoved = true;
				};

				self.fire = fire = function() {
					eventLow1.fire();
				};
			}

			// when node removed, remove this event.
			if (node !== undefined) {
				node.addRemoveHandler(function() {
					if (isRemoved !== true) {
						remove();
					}
				});
			}
		}
	};
});
