var
// array1
array1 = [1, 2, 3],

// array2
array2 = [4, 5, [7, 8]];

EXTEND_ARRAY({
	origin : array1,
	extend : array2
});

console.log('array1:', array1);
