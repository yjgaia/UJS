/**
 * Dom wrapper class
 */
global.DOM = DOM = CLASS({

	preset : function() {
		'use strict';

		return NODE;
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.tag
		//OPTIONAL: params.style
		//OPTIONAL: params.c
		//OPTIONAL: params.on
		//OPTIONAL: params.__TEXT
		//OPTIONAL: params.el

		var
		// tag
		tag = params.tag,

		// __TEXT
		__TEXT = params.__TEXT,
		
		// attrs
		attrs = {},
		
		// style
		style = {},
		
		// events
		events = {},

		// set attr.
		setAttr,
		
		// add style.
		addStyle,
		
		// on.
		on,
		
		// off.
		off,
		
		// get start html.
		getStartHTML,
		
		// get end html.
		getEndHTML;

		inner.setAttr = setAttr = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			var
			// name
			name = params.name,

			// value
			value = params.value;

			attrs[name] = value;
		};
		
		self.addStyle = addStyle = function(_style) {
			//REQUIRED: _style
			
			EACH(_style, function(value, name) {
				
				// flt -> float
				if (name === 'flt') {
					style['float'] = value;
				}
				
				// assume number value is px value.
				else if ( typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
					style[name] = value + 'px';
				}
				
				// set background image. (not need url prefix.)
				else if (name === 'backgroundImage' && value !== 'none') {
					style[name] = 'url(' + value + ')';
				}
				
				// set normal style.
				else {
	
					style[name] = value;
	
					// cross browser transform
					if (name === 'transform') {
						style.WebkitTransform = value;
						style.MozTransform = value;
						style.OTransform = value;
						style.MsTransform = value;
					}
	
					// cross browser transformOrigin
					else if (name === 'transformOrigin') {
						style.WebkitTransformOrigin = value;
						style.MozTransformOrigin = value;
						style.OTransformOrigin = value;
						style.MsTransformOrigin = value;
					}
	
					// cross browser animation
					else if (name === 'animation') {
						style.WebkitAnimation = value;
						style.MozAnimation = value;
						style.OAnimation = value;
						style.MsAnimation = value;
					}
	
					// cross browser touchCallout
					else if (name === 'touchCallout') {
						style.WebkitTouchCallout = value;
						style.MozTouchCallout = value;
						style.OTouchCallout = value;
						style.MsTouchCallout = value;
					}
	
					// cross browser userSelect
					else if (name === 'userSelect') {
						style.WebkitUserSelect = value;
						style.MozUserSelect = value;
						style.OUserSelect = value;
						style.MsUserSelect = value;
					}
	
					// cross browser backgroundSize
					else if (name === 'backgroundSize') {
						style.WebkitBackgroundSize = value;
						style.MozBackgroundSize = value;
						style.OBackgroundSize = value;
						style.MsBackgroundSize = value;
					}
	
					// cross browser backgroundPosition
					else if (name === 'backgroundPosition') {
						style.WebkitBackgroundPosition = value;
						style.MozBackgroundPosition = value;
						style.OBackgroundPosition = value;
						style.MsBackgroundPosition = value;
					}
				}
			});
		};
		
		self.getStartHTML = getStartHTML = function() {
			
		};
		
		self.getEndHTML = getEndHTML = function() {
			
		};
	}
});
