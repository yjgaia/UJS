var
// data
data = {
	a : 1,
	b : 2,
	c : 3
},

// array
array = [3, 2, 1];

REMOVE({
	data : data,
	key : 'b'
});
console.log('data after remove at b:', data);

REMOVE({
	data : array,
	key : 1
});
console.log('array after remove at 1:', array);

REMOVE({
	data : data,
	value : 1
});
console.log('data after remove 1:', data);

REMOVE({
	data : array,
	value : 1
});
console.log('array after remove 1:', array);
