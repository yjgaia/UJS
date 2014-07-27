var
// form
form,

// input
input,

// test div
div = DIV({
	style : {
		position : 'fixed',
		left : 40,
		top : 40,
		backgroundColor : 'red',
		padding : 20,
		margin : 0
	},
	c :

	// form
	form = FORM({
		c : [DIV({
			c : [H5({
				c : 'Name'
			}), input = INPUT({
				name : 'name'
			})]
		}), DIV({
			style : {
				marginTop : 10
			},
			c : [H5({
				c : 'Gender'
			}), SELECT({
				name : 'gender',
				c : [OPTION({
					value : 'male',
					c : 'Male'
				}), OPTION({
					value : 'female',
					c : 'Female'
				})]
			})]
		}), DIV({
			style : {
				marginTop : 10
			},
			c : [H5({
				c : 'Age'
			}), INPUT({
				name : 'age'
			})]
		}), DIV({
			style : {
				marginTop : 10
			},
			c : [H5({
				c : 'Profile'
			}), TEXTAREA({
				name : 'profile'
			})]
		})]
	})
}).appendTo(BODY);

form.setData({
	name : 'SYJ',
	gender : 'male',
	age : 26,
	profile : 'Young man.'
});

console.log(form.getData());
console.log(input.getValue());

// remove div after 3 seconds.
DELAY(3, function() {
	div.remove();
});

