/**
 * fire all events.
 */
global.FIRE_ALL = FIRE_ALL = METHOD({

	run : function(nameOrParams) {
		'use strict';
		//REQUIRED: nameOrParams
		//OPTIONAL: nameOrParams.node
		//REQUIRED: nameOrParams.name

		var
		// node
		node,

		// name
		name,

		// node id
		nodeId;

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

		if (EVENT.getEventMap()[nodeId] !== undefined) {

			EACH(EVENT.getEventMap()[nodeId][name], function(evt) {
				evt.fire();
			});
		}
	}
});
