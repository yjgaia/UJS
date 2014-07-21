/**
 * Textarea class
 */
global.TEXTAREA = TEXTAREA = CLASS({

	preset : function() {'use strict';
		return DOM;
	},

	params : function() {'use strict';
		return {
			tag : 'textarea'
		};
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.name
		//OPTIONAL: params.placeholder
		//OPTIONAL: params.value

		var
		// name
		name = params.name,

		// placeholder
		placeholder = params.placeholder,

		// value
		value = params.value,

		// is ctrl down
		isCtrlDown = false,

		// get name.
		getName,

		// get value.
		getValue,

		// set value.
		setValue,

		// select.
		select,

		// focus.
		focus,

		// blur.
		blur;

		inner.setAttr({
			name : 'name',
			value : name
		});

		if (placeholder !== undefined) {
			inner.setAttr({
				name : 'placeholder',
				value : placeholder
			});
		}

		self.getName = getName = function() {
			return name;
		};

		self.getValue = getValue = function() {
			return self.getEl().value;
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			if (self.getEl().value !== value) {

				self.getEl().value = value;

				FIRE_ALL({
					node : self,
					name : 'change'
				});

			} else {
				self.getEl().value = value;
			}
		};

		if (value !== undefined) {
			setValue(value);
		}

		self.select = select = function() {
			self.getEl().select();
		};

		self.focus = focus = function() {
			self.getEl().focus();
		};

		self.blur = blur = function() {
			self.getEl().blur();
		};

		EVENT({
			node : self,
			name : 'keydown'
		}, function(e) {

			var
			// key code
			keyCode = e.getKeyCode();

			if (keyCode === 91 || keyCode === 17) {
				isCtrlDown = true;
			} else if (isCtrlDown !== true) {
				e.stopBubbling();
			}
		});

		EVENT({
			node : self,
			name : 'keyup'
		}, function(e) {

			var
			// key code
			keyCode = e.getKeyCode();

			if (keyCode === 91 || keyCode === 17) {
				isCtrlDown = false;
			}
		});

		EVENT({
			node : self,
			name : 'focus'
		}, function() {
			INPUT.getFocusingInputIds().push(self.id);
		});

		EVENT({
			node : self,
			name : 'blur'
		}, function() {

			REMOVE({
				data : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});

		self.addRemoveHandler(function() {

			REMOVE({
				data : INPUT.getFocusingInputIds(),
				value : self.id
			});
		});
	}
});
