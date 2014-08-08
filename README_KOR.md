# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASEIO/UPPERCASE.JS/master/LOGO.png)
동적인 웹 사이트 및 웹 애플리케이션 개발을 위한 쉽고 명확하면서 강력한 풀스택 (server-to-client) JavaScript 라이브러입니다. 모든 API가 대문자로 이루어져 있습니다. [UPPERCASE.IO](http://UPPERCASE.IO)에서 사용되고 있습니다.

###### COMPONENTS
* [UPPERCASE.JS-COMMON](#UPPERCASE.JS-COMMON)
* [UPPERCASE.JS-NODE](#UPPERCASE.JS-NODE)
* [UPPERCASE.JS-BROWSER](#UPPERCASE.JS-BROWSER)
* [UPPERCASE.JS-PHANTOM](#UPPERCASE.JS-PHANTOMs)
* [UPPERCASE.JS-TITANIUM](#UPPERCASE.JS-TITANIUM)

## UPPERCASE.JS-COMMON
객체지향 프로그래밍 지원 및 다양한 기능을 제공하는 JavaScript 라이브러리입니다.
JavaScript 유틸리티를 찾고 계신다면 UPPERCASE.JS-COMMON을 사용해보세요.

* `METHOD` 메소드를 생성합니다. 메소드에 static 변수를 지정할 수 있습니다.
```javascript
method = METHOD({
	run: function(params, callback) {
		callback(params.name + ' is ' + params.age + ' years old.');
	}
});
method({ name: 'YJ Sim', age: 27 }, function(content) {
	console.log(content); // YJ Sim is 27 years old.
});
```
```javascript
method = METHOD(function(m) {
	// 정적 변수
	m.staticString = 'Static!';
	return {
		run: function(params, callback) {...}
	};
});
method.staticString // 'Static!'
```

#### `OOP` 제대로 된 객체지향 프로그래밍
* `CLASS` 클래스를 선언합니다. 클래스 상속이 가능하고, private 및 public, protected 변수를 지정할 수 있습니다. 또한 파라미터를 객체 생성 이전에 수정할 수 있으며 static 변수를 지정할 수도 있습니다.
```javascript
Sample = CLASS({
	init: function(inner, self, params, callback) {
		callback();
		self.hello = function() {
			console.log(params.name + ' is ' + params.age + ' years old.');
		};
	}
});
var sample = Sample({ name: 'YJ Sim', age: 27 }, function() {
	console.log('OK');
});
sample.hello(); // YJ Sim is 27 years old.
```
```javascript
Sample = CLASS({
	// 초기 파라미터를 지정합니다.
	params: function() {
		return {...};
	},
	// 파라미터를 수정하거나, 부모 CLASS를 상속합니다.
	preset: function(params, funcs) {
		...
		return parentClass;
	},
	// 객체를 초기화합니다.
	init: function(inner, self, params, funcs) {
		inner.a // 상속된 자식 객체에서만 사용할 수 있습니다.
		self.b // 외부에서 사용할 수 있습니다.
		...
	},
	// 초기화 이후에 실행됩니다.
	afterInit: function(inner, self, params, funcs) {...}
});
```
```javascript
Sample = CLASS(function(c) {
	// 정적 변수
	c.staticString = 'Static!';
	return {
		init: function(inner, self, params, funcs) {...}
	};
});
Sample.staticString // 'Static!'
```
* `OBJECT` 객체를 선언합니다. 모든 객체가 선언된 이후에는 `INIT_OBJECTS()`로 초기화합니다.
```javascript
sample = OBJECT({
	init: function(inner, self) {
		self.hello = function() {
			console.log('Hi there?');
		};
	}
});
// init all objects.
INIT_OBJECTS();
sample.hello(); // Hi there?
```

#### `UTIL` 꼭 필요한 것들만 모아놓은 유틸리티 패키지
* `INTEGER(integerString)` convert integer string to integer number.
* `REAL(realString)` convert real string to real number.
* `RANDOM(max)` `RANDOM({min:, max:})` `RANDOM({min:, limit:})` generate random integer.
* `RANDOM_STR(length)` generate random string.
* `CALENDAR()` `CALENDAR(date)` Calendar class
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
* `CHECK_IS_DATA(it)` check it is data.
* `CHECK_IS_EMPTY_DATA(data)` check data is empty.
* `CHECK_IS_ARRAY(it)` check it is array.
* `CHECK_ARE_SAME(array)` check are same all elements in array.
* `CHECK_IS_IN({data:, value:})` `CHECK_IS_IN({array:, value:})` check is exists value in data or array.
* `COMBINE(data)` `COMBINE(array)` combine data set or arrays.
* `COPY(data)` `COPY(array)` copy data or array.
* `EXTEND({origin:, extend:})` extend data or array.
* `FIND({data:, value:})` `FIND({array:, value:})` find name or key in data or array.
* `REMOVE({data:, name:})` `REMOVE({data:, value:})` `REMOVE({array:, key:})` `REMOVE({array:, value:})` `REMOVE(dataOrArray, function(value) {})` remove at name or key or some value in data or array.
* `RUN(function(func) {})` just run. use this if you need a code block.
* `RAR(function() {})` `RAR(params, function(params) {})` run `func` and return it.
* `REPEAT(count, function(i) {})` `REPEAT({start:, end:}, function(i) {})` `REPEAT({start:, end:, step:}, function(i) {})` `REPEAT({start:, limit:}, function(i) {})` `REPEAT({start:, limit:, step:}, function(i) {})` run `func` repeat `count` time, or same as `for`.
* `EACH(data, function(value) {})` `EACH(array, function(value) {})` same as `foreach`.
* `DELAY(seconds, function(delay) {})` Delay class
```javascript
delay = DELAY(3, function(delay) {});
delay.remove();
```
* `INTERVAL(seconds, function(interval) {})` Interval class
```javascript
interval = INTERVAL(3, function(interval) {});
interval.remove();
```
* `LOOP(fps, function() {})` `LOOP(fps, {start: function() {}, interval: function() {}, end: function() {}})` Loop class (for game etc.)
```javascript
loop = LOOP(100, {start: function() {}, interval: function() {}, end: function() {}});
loop.changeFPS(fps);
loop.remove();
```
* `OVERRIDE(origin, function(origin) {})` override something.
* `NEXT([function(next) {}, function() { return function() {}; }, function() { return function() {}; }, ...])` `NEXT(count, [function(i, next) {}, function() { return function() {}; }, ...])` `NEXT(array, [function(element, next) {}, function() { return function() {}; }, ...])` async control-flow method that makes stepping through logic easy.
* `STRINGIFY(value)` stringify object.
* `PARSE_STR(objectString)` parse stringified object.
* `VALID(validDataSet)` Data validation class
```javascript
validResult = VALID(validData).check({
     data : data
});
validResult.checkHasError()
validResult.getErrors()
```

## UPPERCASE.JS-NODE
node.js 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
node.js를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-NODE를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

### node.js에서 사용하기
* `require`와 `INIT_OBJECTS();`은 한번만 실행합니다.

```javascript
require('UPPERCASE.JS-COMMON.js');
require('UPPERCASE.JS-NODE.js');

// 선언부
var
// method
method = METHOD({
	run : function() {
		console.log('HELLO UPPERCASE.JS!');
	}
});

// init all singleton classes.
INIT_OBJECTS();

// 실행부
method();
```

## UPPERCASE.JS-BROWSER
웹 브라우저에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
모든 브라우저와 호환되는 브라우저용 유틸리티와 훌륭한 템플릿 엔진을 찾으신다면 UPPERCASE.JS-BROWSER를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

### UPPERCASE.JS-BROWSER-FIX
COMMON, BROWSER와 함께 사용하는 구버젼 브라우저(IE5.5, Android 2.1 Browser 등)를 지원하는 라이브러리입니다.

* UPPERCASE.JS-COMMON.js가 필요합니다.
* UPPERCASE.JS-BROWSER.js가 필요합니다.

### 브라우저에서 사용하기
* 스크립트를 불러오기 이전에 `global = window;`로 글로벌 변수를 설정합니다.
* `INIT_OBJECTS();`은 한번만 실행합니다.

```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>UPPERCASE.JS Example</title>
	</head>
	<body>
		<script>
			global = window;
		</script>
		<script src="UPPERCASE.JS-COMMON.js"></script>
		<script src="UPPERCASE.JS-BROWSER.js"></script>
		<script src="UPPERCASE.JS-BROWSER-FIX/FIX.js"></script>
		<script>
			global.onload = function() {

				// 선언부
				var
				// method
				method = METHOD({
					run : function() {
						console.log('HELLO UPPERCASE.JS!');
					}
				});

				// init all singleton classes.
				INIT_OBJECTS();

				// 실행부
				method();
			};
		</script>
	</body>
</html>
```

## UPPERCASE.JS-PHANTOM
PhantomJS 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
PhantomJS를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-NODE를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

## UPPERCASE.JS-TITANIUM
Titanium 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
Titanium를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-TITANIUM를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

## License
[MIT License](https://github.com/UPPERCASEIO/UPPERCASE.JS/blob/master/LICENSE.md)

## Author
[Young Jae Sim](http://hanul.me) - [hanul@hanul.me](mailto:hanul@hanul.me)
