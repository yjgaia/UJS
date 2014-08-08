var
// data
data = {
	a : 1,
	b : TO_DELETE,
	c : 3
},

// array
array = [3, TO_DELETE, 1];

REMOVE_TO_DELETE(data);
console.log('data after remove TO_DELETE:', data);

REMOVE_TO_DELETE(array);
console.log('array after remove TO_DELETE:', array);
