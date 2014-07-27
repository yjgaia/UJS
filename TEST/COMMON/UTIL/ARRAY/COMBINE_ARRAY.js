var
// array1
array1 = [1, 2, 3],

// array2
array2 = COMBINE_ARRAY({
	origin : array1
}),

// array3
array3 = COMBINE_ARRAY({
	origin : array1,
	extend : [5, 6]
});

array2[1] = 4;

console.log('array2:', array2);
console.log('array3:', array3);
