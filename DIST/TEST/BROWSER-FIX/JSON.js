var
// data
data = {
	a : 1,
	b : 2,
	c : 3
},

// data2 string
data2Str = '{"d":4, "e":5, "f":6}',

// data2
data2;

console.log(JSON.stringify(data));

data2 = JSON.parse(data2Str);

console.log(data2.f);
