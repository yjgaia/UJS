# UPPERCASE.JS-COMMON
브라우저 환경과 Node.js 환경 및 모든 JavaScript 환경(ECMAScript 5 버전 이상)에서 사용할 수 있는 유틸리티 라이브러리입니다.

우선 UPPERCASE.JS의 가장 기본적인 기능인 `METHOD`를 살펴보도록 하겠습니다.

# METHOD
메소드를 생성합니다. 메소드에 static 함수를 지정할 수 있습니다. [예제보기](../../EXAMPLES/COMMON/METHOD.js)

```javascript
var
// some method
someMethod = METHOD({

	run : function(params, callback) {
	    'use strict';
	
	    var
		// name
		name = params.name,
		
		// age
		age = params.age;
	
		callback(name + ' is ' + age + ' years old.');
	}
});

someMethod({
    name: 'YJ Sim',
    age: 28
}, function(content) {
    'use strict';
    
    // YJ Sim is 28 years old.
	console.log(content);
});
```

```javascript
var
// some method
someMethod = METHOD(function(m) {
    'use strict';
    
    var
    // get string. this is static function.
    getString;
    
	m.getString = getString = function() {
        return 'Static!';
    };
	
	return {
		run : function(params, callback) {...}
	};
});

// run static function.
someMethod.getString();
```

그럼 이제, 객체지향 프로그래밍 지원 기능을 확인해 보겠습니다.

## 객체지향 프로그래밍 지원
비록 JavaScript에서 Prototype 기반 객체지향 프로그래밍이 가능하다고는 하나, 표현력에 한계가 있어 [JSFace](https://github.com/tnhu/jsface)나 [oolib.js](http://idya.github.io/oolib/)등의 라이브러리를 사용하는것이 좋습니다.
UPPERCASE.JS는 객체지향 언어들과 비슷한 방식으로 객체지향 프로그래밍을 지원합니다.

### CLASS
클래스를 선언합니다. 이렇게 선언된 클래스는 상속이 가능하고, private 및 public, protected 변수를 지정할 수 있습니다. 또한 파라미터를 객체가 생성되기 이전에 변경할 수도 있으며 static 함수를 지정할 수도 있습니다. [예제보기](../../EXAMPLES/COMMON/OOP/CLASS.js)

```javascript
var
// Some class
SomeClass = CLASS({
	
	init : function(inner, self, params, func) {
	    'use strict';
		
		var
		// name
		name = params.name,
		
		// age
		age = params.age,
		
		// hello.
		hello;
		
		func();
		
		self.hello = hello = function() {
			console.log(name + ' is ' + age + ' years old.');
		};
	}
}),

// some object
someObject = SampleClass({
	name: 'YJ Sim',
	age: 28
}, function() {
    'use strict';
    
	console.log('object initialized.');
});

// YJ Sim is 28 years old.
someObject.hello();
```

아래 코드는 클래스 선언 시 적용할 수 있는 설정들을 설명합니다.

```javascript
var
// Some class
SomeClass = CLASS({

	// 기본 파라미터를 지정합니다.
	// 파라미터가 넘어오지 않더라도, 기본 파라미터를 이용해 객체를 생성할 수 있습니다.
	params : function() {
		return {...};
	},

	// 파라미터를 수정하거나, 부모 클래스를 상속합니다.
	preset : function(params, funcs) {
		...
		return ParentClass;
	},

	// 객체를 초기화합니다.
	init : function(inner, self, params, funcs) {
	    var a // 여기서만 사용할 수 있습니다.
		inner.b // 상속된 자식 객체에서도 사용할 수 있습니다.
		self.c // 외부에서 사용할 수 있습니다.
		...
	},

	// 초기화 이후에 실행됩니다.
	afterInit : function(inner, self, params, funcs) {...}
});
```

CLASS 또한 METHOD와 마찬가지로 static 함수를 지정할 수 있습니다.

```javascript
var
// some class
SomeClass = CLASS(function(cls) {
    'use strict';
    
    var
    // get string. this is static function.
    getString;
    
	cls.getString = getString = function() {
        return 'Static!';
    };
	
	return {
		init : function(inner, self, params, funcs) {...}
	};
});

// run static function.
SomeClass.getString();
```

### OBJECT

CLASS를 만들지 않고 객체를 바로 선언합니다. 설정 및 내용은 CLASS와 동일하지만, 만들어진 결과는 클래스가 아니라 객체입니다. 모든 객체가 선언된 이후에는 `INIT_OBJECTS()`로 초기화합니다. [예제보기](../../EXAMPLES/COMMON/OOP/OBJECT.js)

* `INIT_OBJECTS`는 애플리케이션 전체에서 한번만 실행합니다. 이후에 선언한 OBJECT는 선언 즉시 초기화 됩니다.

```javascript
// 선언부

var
// sample object
sampleObject = OBJECT({

	init : function(inner, self) {
	    'use strict';
	
	    var
	    // hello.
	    hello;
	
		self.hello = hello = function() {
			console.log('Hi there?');
		};
	}
});

// init all objects.
INIT_OBJECTS();

// 실행부

// Hi there?
sampleObject.hello();
```

이로써 UPPERCASE.JS의 객체지향까지 살펴보았습니다. **위에서 설명한 `METHOD`, `CLASS`, `OBJECT`는 모두 `선언부`에서 선언되어야 합니다.**

그럼 이제, UPPERCASE.JS의 주요 기능 중 하나인 유틸리티 기능을 살펴보도록 하겠습니다.

## 유틸리티
UPPERCASE.JS의 유틸리티 기능들은 JavaScript 기반 프로젝트 개발시 유용하게 사용될 수 있는 각종 기능들을 모아놓은 것입니다.

### 숫자 관련 기능
* `INTEGER(integerString)` convert integer string to integer number. [예제보기](../../EXAMPLES/COMMON/UTIL/NUMBER/INTEGER.js)
* `REAL(realString)` convert real string to real number. [예제보기](../../EXAMPLES/COMMON/UTIL/NUMBER/REAL.js)
* `RANDOM(max)` `RANDOM({min:, max:})` `RANDOM({min:, limit:})` generate random integer. [예제보기](../../EXAMPLES/COMMON/UTIL/NUMBER/RANDOM.js)

### DATA 및 배열 관련 기능
* `CHECK_IS_DATA(it)` check it is data. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA/CHECK_IS_DATA.js)
* `CHECK_IS_EMPTY_DATA(data)` check data is empty. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA/CHECK_IS_EMPTY_DATA.js)
* `CHECK_IS_ARRAY(it)` check it is array. [예제보기](../../EXAMPLES/COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.js)
* `CHECK_ARE_SAME(array)` check are same all elements in array. [예제보기](../../EXAMPLES/COMMON/UTIL/ARRAY/CHECK_ARE_SAME.js)
* `CHECK_IS_IN({data:, value:})` `CHECK_IS_IN({array:, value:})` check is exists value in data or array. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN.js)
* `COMBINE(data)` `COMBINE(array)` combine data set or arrays. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/COMBINE.js)
* `COPY(data)` `COPY(array)` copy data or array. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/COPY.js)
* `EXTEND({origin:, extend:})` extend data or array. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/EXTEND.js)
* `FIND({data:, value:})` `FIND({array:, value:})` find name or key in data or array. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/FIND.js)
* `REMOVE({data:, name:})` `REMOVE({data:, value:})` `REMOVE({array:, key:})` `REMOVE({array:, value:})` `REMOVE(dataOrArray, function(value) {})` remove at name or key or some value in data or array. [예제보기](../../EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/REMOVE.js)

### 날짜 관련 기능
* `CALENDAR()` `CALENDAR(date)` Calendar class [예제보기](../../EXAMPLES/COMMON/UTIL/DATE/CALENDAR.js)
```javascript
cal = CALENDAR(new Date());
cal.getYear()
cal.getMonth()
cal.getDate()
cal.getDay() // 0 is sunday.
cal.getHour()
cal.getMinute()
cal.getSecond()
```

### 함수 관련 기능
* `RUN(function(func) {})` just run. use this if you need a code block. [예제보기](../../EXAMPLES/COMMON/UTIL/FUNCTION/RUN.js)
* `RAR(function() {})` `RAR(params, function(params) {})` run `func` and return it. [예제보기](../../EXAMPLES/COMMON/UTIL/FUNCTION/RAR.js)

### 반복문 관련 기능
* `REPEAT(count, function(i) {})` `REPEAT({start:, end:}, function(i) {})` `REPEAT({start:, end:, step:}, function(i) {})` `REPEAT({start:, limit:}, function(i) {})` `REPEAT({start:, limit:, step:}, function(i) {})` run `func` repeat `count` time, or same as `for`. [예제보기](../../EXAMPLES/COMMON/UTIL/REPEAT/REPEAT.js)
* `EACH(data, function(value) {})` `EACH(array, function(value) {})` `EACH(function(value) {})(array)` same as `foreach`. [예제보기](../../EXAMPLES/COMMON/UTIL/REPEAT/EACH.js)

### 지연 관련 기능
* `DELAY(seconds, function(delay) {})` Delay class [예제보기](../../EXAMPLES/COMMON/UTIL/DELAY/DELAY.js)
```javascript
delay = DELAY(3, function(delay) {});
delay.remove()
```
* `INTERVAL(seconds, function(interval) {})` Interval class [예제보기](../../EXAMPLES/COMMON/UTIL/DELAY/INTERVAL.js)
```javascript
interval = INTERVAL(3, function(interval) {});
interval.remove()
```
* `LOOP(fps, function() {})` `LOOP(fps, {start: function() {}, interval: function() {}, end: function() {}})` Loop class (for game etc.) [예제보기](../../EXAMPLES/COMMON/UTIL/DELAY/LOOP.js)
```javascript
loop = LOOP(100, {start: function() {}, interval: function() {}, end: function() {}});
loop.changeFPS(fps) // ex) loop.changeFPS(60)
loop.remove()
```

### 기타 기능
* `RANDOM_STR(length)` generate random string. [예제보기](../../EXAMPLES/COMMON/UTIL/RANDOM_STR.js)
* `OVERRIDE(origin, function(origin) {})` override something. [예제보기](../../EXAMPLES/COMMON/UTIL/OVERRIDE.js)
* `NEXT([function(next) {}, function() { return function() {}; }, function() { return function() {}; }, ...])` `NEXT(count, [function(i, next) {}, function() { return function() {}; }, ...])` `NEXT(array, [function(element, next) {}, function() { return function() {}; }, ...])` async control-flow method that makes stepping through logic easy. [예제보기](../../EXAMPLES/COMMON/UTIL/NEXT.js)
* `PARALLEL([function(done) {}, function(done) {}, ..., function() {}])` `PARALLEL(count, [function(done) {}, function() {}])` `PARALLEL(array, [function(value, done) {}, function() {}])` run funcs in parallel. [예제보기](../../EXAMPLES/COMMON/UTIL/PARALLEL.js)
* `STRINGIFY(value)` stringify object. [예제보기](../../EXAMPLES/COMMON/UTIL/STRINGIFY.js)
* `PARSE_STR(objectString)` parse stringified object. [예제보기](../../EXAMPLES/COMMON/UTIL/PARSE_STR.js)
* `VALID(validDataSet)` Data validation class [예제보기](../../EXAMPLES/COMMON/UTIL/VALID.js)
```javascript
validResult = VALID(validData).check({
     data : data
});
validResult.checkHasError()
validResult.getErrors()
```
* `URI_MATCHER(format)` URI matcher class [예제보기](../../EXAMPLES/COMMON/UTIL/URI_MATCHER.js)
```javascript
matchResult = URI_MATCHER(format).check(uri);
matchResult.checkIsMatched()
matchResult.getErrors()
```

다음 문서: [UPPERCASE.JS-BROWSER](UPPERCASE.JS-BROWSER.md)
