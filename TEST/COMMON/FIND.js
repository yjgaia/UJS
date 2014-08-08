var
// data
data = {
	a : 1,
	b : 2,
	c : 3
},

// array
array = [3, 2, 1];

console.log('find 1 in data:', FIND({
	data : data,
	value : 1
}));

console.log('find 1 in array:', FIND({
	array : array,
	value : 1
}));
