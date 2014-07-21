var
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

console.log(CHECK_ARE_SAME_ARRAYS({
	array1 : array1,
	array2 : array2
}));

array2[0] = 0;

console.log(CHECK_ARE_SAME_ARRAYS({
	array1 : array1,
	array2 : array2
}));
