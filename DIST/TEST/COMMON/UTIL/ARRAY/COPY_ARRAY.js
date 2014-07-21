var
// array
array = [1, ['a', 'b', 'c'], {
	d : 1
}],

// copy
copy = COPY_ARRAY(array);

copy[0] = 2;

console.log('array:', array);
console.log('copy:', copy);
