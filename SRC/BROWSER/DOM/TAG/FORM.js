/**
 * Form class
 */
global.FORM = FORM = CLASS({

	preset : function() {'use strict';
		return DOM;
	},

	params : function() {'use strict';
		return {
			tag : 'form'
		};
	},

	init : function(inner, self, params) {'use strict';
		//REQUIRED: params
		//REQUIRED: params.action
		//REQUIRED: params.target
		//REQUIRED: params.method
		//REQUIRED: params.enctype

		var
		// action
		action = params.action,

		// target
		target = params.target,

		// method
		method = params.method,

		// enctype
		enctype = params.enctype,

		// get data.
		getData,

		// set data.
		setData,

		// submit.
		submit;

		if (action !== undefined) {
			inner.setAttr({
				name : 'action',
				value : action
			});
		}

		if (target !== undefined) {
			inner.setAttr({
				name : 'target',
				value : target
			});
		}

		if (method !== undefined) {
			inner.setAttr({
				name : 'method',
				value : method
			});
		}

		if (enctype !== undefined) {
			inner.setAttr({
				name : 'enctype',
				value : enctype
			});
		}

		self.getData = getData = function() {

			var
			// data
			data = {},

			// f.
			f = function(node) {
				//REQUIRED: node

				EACH(node.getChildren(), function(child) {

					if (child.getValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
						data[child.getName()] = child.getValue();
					}

					f(child);
				});
			};

			f(self);

			return data;
		};

		self.setData = setData = function(data) {
			//REQUIRED: data

			var
			// f.
			f = function(node) {
				//REQUIRED: node

				EACH(node.getChildren(), function(child) {

					var
					// value
					value;

					if (child.setValue !== undefined && child.getName !== undefined && child.getName() !== undefined) {
						value = data[child.getName()];
						child.setValue(value === undefined ? '' : value);
					}

					f(child);
				});
			};

			f(self);
		};

		EVENT({
			node : self,
			name : 'submit'
		}, function(e) {
			e.stop();
		});

		self.submit = submit = function(isRealSubmit) {
			//OPTIONAL: isRealSubmit

			FIRE_ALL({
				node : self,
				name : 'submit'
			});

			if (isRealSubmit === true) {
				self.getEl().submit();
			}
		};
	}
});
