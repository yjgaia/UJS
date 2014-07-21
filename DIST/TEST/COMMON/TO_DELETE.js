var
// data
data = {
	a : 1,
	b : 2,
	c : 3
};

// b will be deleted.
data.b = TO_DELETE;

// delete b.
delete data.b;

console.log(data);
