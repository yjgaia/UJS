var
// data
data = {
	a : 1,
	b : ['a', 'b', 'c'],
	c : {
		d : 1
	}
},

// copy data
copy;

copy = COPY_DATA(data);

copy.a = 2;

console.log('data:', data);
console.log('copy:', copy);
