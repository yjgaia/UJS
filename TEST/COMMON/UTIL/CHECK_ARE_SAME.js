var
// data1
data1 = {
	a : 1,
	b : 2,
	c : [1, 2, 3]
},

// data2
data2 = {
	a : 1,
	b : 2,
	c : [1, 2, 3]
},

// array1
array1 = [1, 2, 3, 4, {
	a : 1,
	b : 2
}, [5, 6]],

// array2
array2 = [1, 2, 3, 4, {
	a : 1,
	b : 2
}, [5, 6]];

console.log(CHECK_ARE_SAME([data1, data2]));

data2.a = 0;

console.log(CHECK_ARE_SAME([data1, data2]));

console.log(CHECK_ARE_SAME([array1, array2]));

array2[0] = 0;

console.log(CHECK_ARE_SAME([array1, array2]));