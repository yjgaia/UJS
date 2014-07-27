var
// just value
value = 1,

// data
data = {
	a : 1,
	b : 2,
	c : 3
},

// array
array = [1, 2, 3],

// function
func;

EACH(value, function(value, i) {
	console.log('value each - ' + i + ': ' + value);
});

EACH(data, function(value, name) {
	console.log('data each - ' + name + ': ' + value);
});

EACH(array, function(value, i) {
	console.log('array each - ' + i + ': ' + value);
});

func = function() {
	EACH(arguments, function(value, i) {
		console.log('arguments each - ' + i + ': ' + value);
	});
};

func(3, 2, 1);
