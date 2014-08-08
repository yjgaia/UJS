var
// data1
data1 = {
	a : 1,
	b : 2,
	c : 3,
	d : ['a', 'b', 'c']
},

// data2
data2 = {
	d : ['d', 'e'],
	e : {
		k : 1
	}
},

// array1
array1 = [1, 2, 3],

// array2
array2 = [4, 5, [7, 8]];

EXTEND({
	origin : data1,
	extend : data2
});

EXTEND({
	origin : data2,
	extend : {
		e : 5
	}
});

console.log('data1:', data1);
console.log('data2:', data2);

EXTEND({
	origin : array1,
	extend : array2
});

console.log('array1:', array1);
