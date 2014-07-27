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
};

console.log(CHECK_ARE_SAME_DATA_SET({
	data1 : data1,
	data2 : data2
}));

data2.a = 0;

console.log(CHECK_ARE_SAME_DATA_SET({
	data1 : data1,
	data2 : data2
}));
