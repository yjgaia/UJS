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
		//REQUIRED: params
		//OPTIONAL: params.value

		var
		// value
		value = params.value,

		// get value.
		getValue,

		// set value.
		setValue;

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
