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

console.log('value:', CHECK_IS_ARGUMENTS(value));
console.log('data:', CHECK_IS_ARGUMENTS(data));
console.log('array:', CHECK_IS_ARGUMENTS(array));

func = function() {
	console.log('arguments:', CHECK_IS_ARGUMENTS(arguments));
};

func();
