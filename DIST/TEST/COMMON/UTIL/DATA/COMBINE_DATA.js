var
// data1
data1 = {
	a : 1,
	b : 2,
	c : 3
},

// data2
data2 = COMBINE_DATA({
	origin : data1
}),

// data3
data3 = COMBINE_DATA({
	origin : data1,
	extend : {
		d : 4
	}
});

data2.b = 4;

console.log('data2:', data2);
console.log('data3:', data3);
