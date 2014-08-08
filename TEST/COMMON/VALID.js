var
// data
data = {
	parentId : 'test',
	factorCount : 1.2,
	isCompanyFolder : 'true',
	category : 'tile',
	man : {
		name : 'test'
	},
	mans : [{
		name : 'test'
	}]
},

// valid data
validData = {
	parentId : {
		id : true
	},
	name : {
		notEmpty : true,
		size : {
			min : 0,
			max : 255
		}
	},
	factorCount : {
		notEmpty : true,
		integer : true
	},
	isCompanyFolder : {
		bool : true
	},
	category : {
		notEmpty : true,
		one : ['thing', 'creature', 'item', 'wallItem', 'tile', 'wall']
	},
	man : {
		data : true,
		detail : {
			name : {
				notEmpty : true,
				size : {
					max : 255
				}
			}
		}
	},
	mans : {
		array : true,
		element : {
			data : true,
			detail : {
				name : {
					notEmpty : true,
					size : {
						max : 255
					}
				}
			}
		}
	}
},

// valid result
validResult = VALID(validData).check({
	data : data
});

console.log(validResult.getErrors());

// test not empty.
console.log('notEmpty - undefined:', VALID.notEmpty(undefined), ', null:', VALID.notEmpty(null), ', \'\':', VALID.notEmpty(''), ', 1:', VALID.notEmpty(1), ', \'test\':', VALID.notEmpty('test'));

// test regex valid.
console.log('regex - /[a-z][a-z][a-z]/, \'abc\':', VALID.regex({
	pattern : /[a-z][a-z][a-z]/,
	value : 'abc'
}));

// test string size.
console.log('size - min=1, max=2, \'abc\':', VALID.size({
	min : 1,
	max : 2,
	value : 'abc'
}), ', min=1, max=4, \'abc\':', VALID.size({
	min : 1,
	max : 4,
	value : 'abc'
}), ', min=4, max=1, \'abc\':', VALID.size({
	min : 4,
	max : 1,
	value : 'abc'
}), ', min=1, \'abc\':', VALID.size({
	min : 1,
	value : 'abc'
}), ', max=4, \'abc\':', VALID.size({
	max : 4,
	value : 'abc'
}), ', min=4, \'abc\':', VALID.size({
	min : 4,
	value : 'abc'
}), ', max=1, \'abc\':', VALID.size({
	max : 1,
	value : 'abc'
}), ', \'abc\':', VALID.size({
	value : 'abc'
}));

// test integer.
console.log('integer - \'abc\':', VALID.integer('abc'), ', undefined:', VALID.integer(undefined), ', null:', VALID.integer(null), ', 1:', VALID.integer(1), ', 1.2:', VALID.integer(1.2), ', []:', VALID.integer([]), ', true:', VALID.integer(true), ', false:', VALID.integer(false), ', new Date():', VALID.integer(new Date()));

// test real.
console.log('real - \'abc\':', VALID.real('abc'), ', undefined:', VALID.real(undefined), ', null:', VALID.real(null), ', 1:', VALID.real(1), ', 1.2:', VALID.real(1.2), ', []:', VALID.real([]), ', true:', VALID.real(true), ', false:', VALID.real(false), ', new Date():', VALID.real(new Date()));

// test boolean.
console.log('bool - \'abc\':', VALID.bool('abc'), ', undefined:', VALID.bool(undefined), ', null:', VALID.bool(null), ', 1:', VALID.bool(1), ', 1.2:', VALID.bool(1.2), ', []:', VALID.bool([]), ', true:', VALID.bool(true), ', false:', VALID.bool(false), ', new Date():', VALID.bool(new Date()));

// test Date type.
console.log('date - \'abc\':', VALID.date('abc'), ', undefined:', VALID.date(undefined), ', null:', VALID.date(null), ', 1:', VALID.date(1), ', 1.2:', VALID.date(1.2), ', []:', VALID.date([]), ', true:', VALID.date(true), ', false:', VALID.date(false), ', new Date():', VALID.date(new Date()));

// test min.
console.log('min - min=3, \'abc\':', VALID.min({
	min : 3,
	value : 'abc'
}), ', min=3, undefined:', VALID.min({
	min : 3,
	value : undefined
}), ', min=3, null:', VALID.min({
	min : 3,
	value : null
}), ', min=3, 1:', VALID.min({
	min : 3,
	value : 1
}), ', min=1, 3:', VALID.min({
	min : 1,
	value : 3
}), ', min=3, 1.2:', VALID.min({
	min : 3,
	value : 1.2
}), ', min=1.2, 3:', VALID.min({
	min : 1.2,
	value : 3
}), ', min=1.2, []:', VALID.min({
	min : 1.2,
	value : []
}), ', min=1.2, true:', VALID.min({
	min : 1.2,
	value : true
}), ', min=1.2, false:', VALID.min({
	min : 1.2,
	value : false
}), ', min=1.2, new Date():', VALID.min({
	min : 1.2,
	value : new Date()
}));

// test max.
console.log('max - max=3, \'abc\':', VALID.max({
	max : 3,
	value : 'abc'
}), ', max=3, undefined:', VALID.max({
	max : 3,
	value : undefined
}), ', max=3, null:', VALID.max({
	max : 3,
	value : null
}), ', max=3, 1:', VALID.max({
	max : 3,
	value : 1
}), ', max=1, 3:', VALID.max({
	max : 1,
	value : 3
}), ', max=3, 1.2:', VALID.max({
	max : 3,
	value : 1.2
}), ', max=1.2, 3:', VALID.max({
	max : 1.2,
	value : 3
}), ', max=1.2, []:', VALID.max({
	max : 1.2,
	value : []
}), ', max=1.2, true:', VALID.max({
	max : 1.2,
	value : true
}), ', max=1.2, false:', VALID.max({
	max : 1.2,
	value : false
}), ', max=1.2, new Date():', VALID.max({
	max : 1.2,
	value : new Date()
}));

// test email.
console.log('email - \'this@is.email\':', VALID.email('this@is.email'), ', \'abc\':', VALID.email('abc'), ', undefined:', VALID.email(undefined), ', null:', VALID.email(null), ', 1:', VALID.email(1), ', 1.2:', VALID.email(1.2), ', []:', VALID.email([]), ', true:', VALID.email(true), ', false:', VALID.email(false), ', new Date():', VALID.email(new Date()));

// test url.
console.log('url - \'http://www.btncafe.com\':', VALID.url('http://www.btncafe.com'), ', \'abc\':', VALID.url('abc'), ', undefined:', VALID.url(undefined), ', null:', VALID.url(null), ', 1:', VALID.url(1), ', 1.2:', VALID.url(1.2), ', []:', VALID.url([]), ', true:', VALID.url(true), ', false:', VALID.url(false), ', new Date():', VALID.url(new Date()));

// test username.
console.log('username - \'btncafe-88_88\':', VALID.username('btncafe-88_88'), ', \'abc\':', VALID.username('abc'), ', undefined:', VALID.username(undefined), ', null:', VALID.username(null), ', 1:', VALID.username(1), ', 1.2:', VALID.username(1.2), ', []:', VALID.username([]), ', true:', VALID.username(true), ', false:', VALID.username(false), ', new Date():', VALID.username(new Date()));

// test id.
console.log('id - \'51889ace0000001106000002\':', VALID.id('51889ace0000001106000002'), ', \'abc\':', VALID.id('abc'), ', undefined:', VALID.id(undefined), ', null:', VALID.id(null), ', 1:', VALID.id(1), ', 1.2:', VALID.id(1.2), ', []:', VALID.id([]), ', true:', VALID.id(true), ', false:', VALID.id(false), ', new Date():', VALID.id(new Date()));

// test one.
console.log('one - array=[1, 2, 3], 2:', VALID.one({
	value : 2,
	array : [1, 2, 3]
}), ', array=[1, 2, 3], 4:', VALID.one({
	value : 4,
	array : [1, 2, 3]
}));

// test array.
console.log('array - 2:', VALID.array(2), ', [1, 2, 3]:', VALID.array([1, 2, 3]), ', { a : 1, b : 2 }:', VALID.array({
	a : 1,
	b : 2
}));

// test data.
console.log('data - 2:', VALID.data(2), ', [1, 2, 3]:', VALID.data([1, 2, 3]), ', { a : 1, b : 2 }:', VALID.data({
	a : 1,
	b : 2
}));

// test element.
console.log('element - [1, 2, 3] is integer array?:', VALID.element({
	array : [1, 2, 3],
	validData : {
		integer : true
	}
}), ', [1, 2, 3] is boolean array?:', VALID.element({
	array : [1, 2, 3],
	validData : {
		bool : true
	}
}));

// test property.
console.log('property - { a : 1, b : 2, c : 3 } is integer data?:', VALID.property({
	data : {
		a : 1,
		b : 2,
		c : 3
	},
	validData : {
		integer : true
	}
}), ', { a : 1, b : 2, c : 3 } is boolean data?:', VALID.property({
	data : {
		a : 1,
		b : 2,
		c : 3
	},
	validData : {
		bool : true
	}
}));

// test detail.
console.log('detail - { a : 1, b : 2, c : 3 } b is integer?:', VALID.detail({
	data : {
		a : 1,
		b : 2,
		c : 3
	},
	validDataSet : {
		b : {
			integer : true
		}
	}
}), ', { a : 1, b : 2, c : 3 } b is boolean?:', VALID.detail({
	data : {
		a : 1,
		b : 2,
		c : 3
	},
	validDataSet : {
		b : {
			bool : true
		}
	}
}));

// test equal.
console.log('equal - validValue=4, 4:', VALID.equal({
	value : 4,
	validValue : 4
}), ', validValue=4, 3:', VALID.equal({
	value : 3,
	validValue : 4
}), ', validValue={ msg : 1 }, { msg : 1 }:', VALID.equal({
	value : {
		msg : 1
	},
	validValue : {
		msg : 1
	}
}));
