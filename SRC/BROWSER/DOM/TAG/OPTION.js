/**
 * Option class
 */
global.OPTION = OPTION = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'option'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//OPTIONAL: params
		//OPTIONAL: params.value

		var
		// value
		value,

		// get value.
		getValue,

		// set value.
		setValue;

		// init params.
		if (params !== undefined) {
			value = params.value;
		}

		self.getValue = getValue = function() {
			return self.getEl().value;
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			self.getEl().value = value;
		};

		if (value === undefined) {
			setValue('');
		} else {
			setValue(value);
		}
	}
});
