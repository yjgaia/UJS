REPEAT(10, function(i) {
	console.log(i);
});

REPEAT({
	start : 5,
	end : 10
}, function(i) {
	console.log(i);
});

REPEAT({
	start : 1,
	limit : 5
}, function(i) {
	console.log(i);
});

REPEAT({
	start : 3,
	end : 1
}, function(i) {
	console.log(i);
});
