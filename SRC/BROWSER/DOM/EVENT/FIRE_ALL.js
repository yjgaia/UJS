/**
 * Fire all events.
 */
global.FIRE_ALL = FIRE_ALL = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.node
		//REQUIRED: params.name

		var
		// node
		node = params.node,

		// name
		name = params.name,

		// node id
		nodeId = node === undefined ? 'body' : node.id;

		if (EVENT.getEventMap()[nodeId] !== undefined) {

			EACH(EVENT.getEventMap()[nodeId][name], function(evt) {
				evt.fire();
			});
		}
	}
});
