var
// data
data = {
	a : 1,
	b : ['a', 'b', 'c'],
	c : {
		d : 1
	}
},

// array
array = [1, ['a', 'b', 'c'], {
	d : 1
}],

// copy
copy = COPY(data);

copy.a = 2;

console.log('data:', data);
console.log('copy:', copy);

copy = COPY(array);

copy[0] = 2;

console.log('array:', array);
console.log('copy:', copy);
