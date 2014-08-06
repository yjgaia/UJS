/**
 * Input class
 */
global.INPUT = INPUT = CLASS(function(cls) {
	'use strict';

	var
	// focusing input ids
	focusingInputIds = [],

	// get focusing input ids.
	getFocusingInputIds;

	cls.getFocusingInputIds = getFocusingInputIds = function(id) {
		return focusingInputIds;
	};

	return {

		preset : function() {
			return DOM;
		},

		params : function() {
			return {
				tag : 'input'
			};
		},

		init : function(inner, self, params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.type
			//OPTIONAL: params.placeholder
			//OPTIONAL: params.value
			//OPTIONAL: params.isMultiple

			var
			// name
			name = params.name,

			// type
			type = params.type,

			// placeholder
			placeholder = params.placeholder,

			// value
			value = params.value,

			// is multiple
			isMultiple = params.isMultiple,

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
			blur,

			// toggle check.
			toggleCheck,

			// check is checked.
			checkIsChecked;

			if (type !== undefined) {
				inner.setAttr({
					name : 'type',
					value : type
				});
			}

			if (type !== 'submit' && type !== 'reset') {

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

				if (isMultiple === true) {
					inner.setAttr({
						name : 'multiple',
						value : isMultiple
					});
				}

				self.getName = getName = function() {
					return name;
				};

				self.getValue = getValue = function() {
					if (type === 'checkbox') {
						return self.getEl().checked;
					}
					return self.getEl().value;
				};

				self.select = select = function() {
					if (type === 'file') {
						self.getEl().click();
					} else {
						self.getEl().select();
					}
				};

				self.focus = focus = function() {
					self.getEl().focus();
				};

				self.blur = blur = function() {
					self.getEl().blur();
				};

				if (type === 'checkbox') {

					self.toggleCheck = toggleCheck = function(e) {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = true;
						}

						FIRE_ALL({
							node : self,
							name : 'change'
						});

						return self.getEl().checked;
					};

					self.checkIsChecked = checkIsChecked = function() {
						return self.getEl().checked;
					};

					EVENT({
						node : self,
						name : 'keyup'
					}, function(e) {
						if (e !== undefined && e.getKeyCode() === 32) {
							DELAY(function() {
								FIRE_ALL({
									node : self,
									name : 'change'
								});
							});
						}
					});
				}
			}

			self.setValue = setValue = function(value) {
				//REQUIRED: value

				if (type === 'checkbox') {

					if (value === true) {

						if (self.getEl().checked !== true) {

							self.getEl().checked = true;

							FIRE_ALL({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {

							self.getEl().checked = false;

							FIRE_ALL({
								node : self,
								name : 'change'
							});

						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {

						self.getEl().value = value;

						FIRE_ALL({
							node : self,
							name : 'change'
						});

					} else {
						self.getEl().value = value;
					}
				}
			};

			if (value !== undefined) {

				if (type === 'checkbox') {

					if (value === true) {

						if (self.getEl().checked !== true) {
							self.getEl().checked = true;
						} else {
							self.getEl().checked = true;
						}

					} else {

						if (self.getEl().checked === true) {
							self.getEl().checked = false;
						} else {
							self.getEl().checked = false;
						}
					}

				} else {

					if (self.getEl().value !== value) {
						self.getEl().value = value;
					} else {
						self.getEl().value = value;
					}
				}
			}

			EVENT({
				node : self,
				name : 'focus'
			}, function() {
				getFocusingInputIds().push(self.id);
			});

			EVENT({
				node : self,
				name : 'blur'
			}, function() {

				REMOVE({
					data : getFocusingInputIds(),
					value : self.id
				});
			});

			EVENT({
				node : self,
				name : 'tap'
			}, function() {
				focus();
			});

			self.addRemoveHandler(function() {

				REMOVE({
					data : getFocusingInputIds(),
					value : self.id
				});
			});
		}
	};
});
