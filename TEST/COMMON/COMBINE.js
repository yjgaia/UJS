var
// data1
data1 = {
	a : 1,
	b : 2,
	c : 3
},

// data2
data2 = COMBINE([data1]),

// data3
data3 = COMBINE([data1, {
	d : 4
}]),

// array1
array1 = [1, 2, 3],

// array2
array2 = COMBINE([array1]),

// array3
array3 = COMBINE([array1, [5, 6]]);

data2.b = 4;

console.log('data2:', data2);
console.log('data3:', data3);

array2[1] = 4;

console.log('array2:', array2);
console.log('array3:', array3);
