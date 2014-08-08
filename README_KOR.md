# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASEIO/UPPERCASE.JS/master/LOGO.png)
동적인 웹 사이트 및 웹 애플리케이션 개발을 위한 쉽고 명확하면서 강력한 풀스택 (server-to-client) JavaScript 라이브러입니다. 모든 API가 대문자로 이루어져 있습니다. [UPPERCASE.IO](http://UPPERCASE.IO)에서 사용되고 있습니다.

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

## COMMON
객체지향 프로그래밍 지원 및 다양한 기능을 제공하는 JavaScript 라이브러리입니다.
JavaScript 유틸리티를 찾고 계신다면 UPPERCASE.JS-COMMON을 사용해보세요.

#### OOP: 제대로 된 객체지향 프로그래밍
* METHOD: 메소드를 생성합니다. 메소드에 static 변수를 지정할 수 있습니다.
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
* CLASS: 클래스를 선언합니다. 클래스 상속이 가능하고, private 및 public, protected 변수를 지정할 수 있습니다. 또한 파라미터를 객체 생성 이전에 수정할 수 있으며 static 변수를 지정할 수도 있습니다.
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
* OBJECT: 객체를 생성합니다.
```javascript
sample = OBJECT({
	init: function(inner, self) {
		self.hello = function() {
			console.log('Hi there?');
		};
	}
});
sample.hello(); // Hi there?
```

## BROWSER
웹 브라우저에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
모든 브라우저와 호환되는 브라우저용 유틸리티와 훌륭한 템플릿 엔진을 찾으신다면 UPPERCASE.JS-BROWSER를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

## BROWSER-FIX
COMMON, BROWSER와 함께 사용하는 구버젼 브라우저(IE5.5, Android 2.1 Browser 등)를 지원하는 라이브러리입니다.

* UPPERCASE.JS-COMMON.js가 필요합니다.
* UPPERCASE.JS-BROWSER.js가 필요합니다.

## NODE
node.js 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
node.js를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-NODE를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

## PHANTOM
PhantomJS 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
PhantomJS를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-NODE를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

## License
[MIT License](https://github.com/UPPERCASEIO/UPPERCASE.JS/blob/master/LICENSE.md)

## Author
Young Jae Sim (http://hanul.me) [hanul@hanul.me](mailto:hanul@hanul.me)
