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
};

EXTEND_DATA({
	origin : data1,
	extend : data2
});

EXTEND_DATA({
	origin : data2,
	extend : {
		e : 5
	}
});

console.log('data1:', data1);
console.log('data2:', data2);
