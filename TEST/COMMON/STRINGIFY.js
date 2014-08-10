TEST('STRINGIFY', function(ok) {
	'use strict';

	var
	// now
	now = new Date(),

	// data
	data = {
		name : 'Yong Jae Sim',
		age : 27,
		country : 'Korea',
		now : now
	},

	// data str
	dataStr = STRINGIFY(data);

	ok(dataStr === '{"name":"Yong Jae Sim","age":27,"country":"Korea","now":' + now.getTime() + ',"__DATE_ATTR_NAMES":["now"]}');
});
