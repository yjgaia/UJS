# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.JS/master/LOGO.png)
동적인 웹 사이트 및 웹 애플리케이션 개발을 위한 쉽고 명확하면서 강력한 풀스택 (server-to-client) JavaScript 라이브러입니다. 모든 API가 대문자로 이루어져 있습니다. [UPPERCASE.IO](http://UPPERCASE.IO)에서 사용되고 있습니다.

###### UPPERCASE.JS-COMMON
객체지향 프로그래밍 지원 및 다양한 기능을 제공하는 JavaScript 라이브러리입니다. JavaScript 유틸리티를 찾고 계신다면 UPPERCASE.JS-COMMON을 사용해보세요.

* 객체지향 지원
* 자바스크립트를 위한 유틸리티

###### UPPERCASE.JS-BROWSER
웹 브라우저에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
모든 브라우저와 호환되는 브라우저용 유틸리티와 웹 애플리케이션 개발용 템플릿 엔진을 찾으신다면 UPPERCASE.JS-BROWSER를 사용해보세요.

	UPPERCASE.JS-BROWSER는 웹 애플리케이션(하이브리드 앱이나 게임 등)을 제작하는데 최적화 되어 있습니다. 문서 기반의 웹 사이트 개발을 위해서는 jQuery나 AngluarJS 등 다른 훌륭한 라이브러리들을 사용하시는 편이 좋습니다.

* 객체지향의 상속을 활용한 구버젼 브라우저 지원
* 브라우저를 위한 유틸리티
* 순수 JS 기반 DOM 엔진

###### COMPONENTS
* [UPPERCASE.JS-COMMON](#uppercasejs-common)
* [UPPERCASE.JS-NODE](#uppercasejs-node)
* [UPPERCASE.JS-BROWSER](#uppercasejs-browser)
* [UPPERCASE.JS-PHANTOM](#uppercasejs-phantom)
* [UPPERCASE.JS-TITANIUM](#uppercasejs-titanium)
* [UPPERCASE.JS-CORDOVA](#uppercasejs-cordova)

## Configuration
###### BROWSER_CONFIG
각 설정은 `BROWSER_CONFIG.isSupportingX2 = true;` 와 같이 설정합니다.
* `isSupportingX2` 레티나 디스플레이 등을 대응하기 위해 이미지 픽셀을 2배씩 늘려주는 설정을 사용할 경우 `true`로 지정합니다.
* `isUsingFlashCanvasPro` FlashCanvas Pro 버젼을 사용하고자 할 때 `true`로 지정합니다. FlashCanvas Pro의 라이센스를 구매하셔야 합니다. http://flashcanvas.net/purchase
* `fixScriptsFolderPath` BROWSER-FIX 스크립트들이 저장되어 있는 폴더의 경로를 지정합니다.
* `loadingBarColor` REQUEST 등 통신을 할 때 나타나는 로딩 바의 색상을 지정하는 설정입니다. 기본값은 `'#007aff'`입니다.

## UPPERCASE.JS-COMMON
객체지향 프로그래밍 지원 및 다양한 기능을 제공하는 JavaScript 라이브러리입니다.
JavaScript 유틸리티를 찾고 계신다면 UPPERCASE.JS-COMMON을 사용해보세요.

* `METHOD` 메소드를 생성합니다. 메소드에 static 변수를 지정할 수 있습니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/METHOD.js)
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
* `CLASS` 클래스를 선언합니다. 클래스 상속이 가능하고, private 및 public, protected 변수를 지정할 수 있습니다. 또한 파라미터를 객체 생성 이전에 수정할 수 있으며 static 변수를 지정할 수도 있습니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/OOP/CLASS.js)
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
* `OBJECT` 객체를 선언합니다. 모든 객체가 선언된 이후에는 `INIT_OBJECTS()`로 초기화합니다. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/OOP/OBJECT.js)
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

#### `UTIL` 꼭 필요한 것들만 모아놓은 유틸리티

###### 숫자 관련
* `INTEGER(integerString)` convert integer string to integer number. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NUMBER/INTEGER.js)
* `REAL(realString)` convert real string to real number. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NUMBER/REAL.js)
* `RANDOM(max)` `RANDOM({min:, max:})` `RANDOM({min:, limit:})` generate random integer. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NUMBER/RANDOM.js)

###### DATA 및 배열 관련
* `CHECK_IS_DATA(it)` check it is data. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA/CHECK_IS_DATA.js)
* `CHECK_IS_EMPTY_DATA(data)` check data is empty. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA/CHECK_IS_EMPTY_DATA.js)
* `CHECK_IS_ARRAY(it)` check it is array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.js)
* `CHECK_ARE_SAME(array)` check are same all elements in array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/ARRAY/CHECK_ARE_SAME.js)
* `CHECK_IS_IN({data:, value:})` `CHECK_IS_IN({array:, value:})` check is exists value in data or array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN.js)
* `COMBINE(data)` `COMBINE(array)` combine data set or arrays. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/COMBINE.js)
* `COPY(data)` `COPY(array)` copy data or array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/COPY.js)
* `EXTEND({origin:, extend:})` extend data or array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/EXTEND.js)
* `FIND({data:, value:})` `FIND({array:, value:})` find name or key in data or array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/FIND.js)
* `REMOVE({data:, name:})` `REMOVE({data:, value:})` `REMOVE({array:, key:})` `REMOVE({array:, value:})` `REMOVE(dataOrArray, function(value) {})` remove at name or key or some value in data or array. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/REMOVE.js)

###### 날짜 관련
* `CALENDAR()` `CALENDAR(date)` Calendar class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATE/CALENDAR.js)
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

###### 함수 관련
* `RUN(function(func) {})` just run. use this if you need a code block. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/FUNCTION/RUN.js)
* `RAR(function() {})` `RAR(params, function(params) {})` run `func` and return it. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/FUNCTION/RAR.js)

###### 반복문 관련
* `REPEAT(count, function(i) {})` `REPEAT({start:, end:}, function(i) {})` `REPEAT({start:, end:, step:}, function(i) {})` `REPEAT({start:, limit:}, function(i) {})` `REPEAT({start:, limit:, step:}, function(i) {})` run `func` repeat `count` time, or same as `for`. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/REPEAT/REPEAT.js)
* `EACH(data, function(value) {})` `EACH(array, function(value) {})` `EACH(function(value) {})(array)` same as `foreach`. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/REPEAT/EACH.js)

###### 지연 관련
* `DELAY(seconds, function(delay) {})` Delay class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DELAY/DELAY.js)
```javascript
delay = DELAY(3, function(delay) {});
delay.remove()
```
* `INTERVAL(seconds, function(interval) {})` Interval class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DELAY/INTERVAL.js)
```javascript
interval = INTERVAL(3, function(interval) {});
interval.remove()
```
* `LOOP(fps, function() {})` `LOOP(fps, {start: function() {}, interval: function() {}, end: function() {}})` Loop class (for game etc.) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DELAY/LOOP.js)
```javascript
loop = LOOP(100, {start: function() {}, interval: function() {}, end: function() {}});
loop.changeFPS(fps) // ex) loop.changeFPS(60)
loop.remove()
```

###### 기타
* `RANDOM_STR(length)` generate random string. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/RANDOM_STR.js)
* `OVERRIDE(origin, function(origin) {})` override something. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/OVERRIDE.js)
* `NEXT([function(next) {}, function() { return function() {}; }, function() { return function() {}; }, ...])` `NEXT(count, [function(i, next) {}, function() { return function() {}; }, ...])` `NEXT(array, [function(element, next) {}, function() { return function() {}; }, ...])` async control-flow method that makes stepping through logic easy. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NEXT.js)
* `PARALLEL([function(done) {}, function(done) {}, ..., function() {}])` `PARALLEL(count, [function(done) {}, function() {}])` `PARALLEL(array, [function(value, done) {}, function() {}])` run funcs in parallel. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/PARALLEL.js)
* `STRINGIFY(value)` stringify object. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/STRINGIFY.js)
* `PARSE_STR(objectString)` parse stringified object. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/PARSE_STR.js)
* `VALID(validDataSet)` Data validation class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/VALID.js)
```javascript
validResult = VALID(validData).check({
     data : data
});
validResult.checkHasError()
validResult.getErrors()
```
* `URI_MATCHER(format)` URI matcher class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/URI_MATCHER.js)
```javascript
matchResult = URI_MATCHER(format).check(uri);
matchResult.checkIsMatched()
matchResult.getErrors()
```

## UPPERCASE.JS-NODE
node.js 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
node.js를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-NODE를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

### node.js에서 사용하기
* `INIT_OBJECTS();`은 한번만 실행합니다.

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

#### Node 패키지

###### Clustering
* `CPU_CLUSTERING(work)` cpu clustering work. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CLUSTERING/CPU_CLUSTERING.js)
* `SERVER_CLUSTERING({servers:, thisServerName:, port:}, work)` server clustering work. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CLUSTERING/SERVER_CLUSTERING.js)
* `SHARED_STORE(name)` Cpu and server clustering shared store class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CLUSTERING/SHARED_STORE.js)

###### File
* `WRITE_FILE({path:, content:}, callbackOrHandlers)` `WRITE_FILE({path:, buffer:}, callbackOrHandlers)` `WRITE_FILE({path:, content: isSync:}, callbackOrHandlers)` write file. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/WRITE_FILE.js)
* `READ_FILE(path, callbackOrHandlers)` `READ_FILE({path:, isSync:}, callbackOrHandlers)` read file. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/READ_FILE.js)
* `COPY_FILE({from:, to:}, callbackOrHandlers)` `COPY_FILE({from:, to:, isSync:}, callbackOrHandlers)` copy file. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/COPY_FILE.js)
* `MOVE_FILE({from:, to:}, callbackOrHandlers)` `MOVE_FILE({from:, to:, isSync:}, callbackOrHandlers)` move file. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/MOVE_FILE.js)
* `REMOVE_FILE(path, callbackOrHandlers)` `REMOVE_FILE({path:, isSync:}, callbackOrHandlers)` remove file. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/REMOVE_FILE.js)
* `CREATE_FOLDER(path, callbackOrHandlers)` `CREATE_FOLDER({path:, isSync:}, callbackOrHandlers)` remove file. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/CREATE_FOLDER.js)
* `FIND_FILE_NAMES(path, callbackOrHandlers)` `FIND_FILE_NAMES({path:, isSync:}, callbackOrHandlers)` find file names. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/FIND_FILE_NAMES.js)
* `FIND_FOLDER_NAMES(path, callbackOrHandlers)` `FIND_FOLDER_NAMES({path:, isSync:}, callbackOrHandlers)` find folder names. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/FIND_FOLDER_NAMES.js)

###### HTTP Request
* `REQUEST({host:, port:, method:, uri:}, responseListenerOrListeners)` `REQUEST({host:, method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` http request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/REQUEST.js)
* `GET({host:, port:, uri:, paramStr:, data:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:}, responseListenerOrListeners)` http GET request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/GET.js)
* `POST({host:, port:, uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` http POST request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/POST.js)
* `PUT({host:, port:, uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` http PUT request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/PUT.js)
* `DELETE({host:, port:, uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` http DELETE request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/DELETE.js)

###### Server
* `SOCKET_SERVER(port, connectionListener)` create socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/SOCKET_SERVER.js)
* `CONNECT_TO_SOCKET_SERVER({host:, port:}, connectionListenerOrListeners)` connect to socket server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CONNECT/CONNECT_TO_SOCKET_SERVER.js)
* `WEB_SERVER(port, requestListener)` `WEB_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:}, requestListener)` create web server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/WEB_SERVER.js)
* `RESOURCE_SERVER({port:, rootPath:}, requestListenerOrHandlers)` `RESOURCE_SERVER({port:, rootPath:, version:}, requestListenerOrHandlers)` `RESOURCE_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:, rootPath:}, requestListenerOrHandlers)` create resourec server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/RESOURCE_SERVER.js)

###### Encryption
* `SHA1({key:, password:})` SHA1 encrypt. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/ENCRYPTION/SHA1.js)

###### Console [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CONSOLE_COLOR/CONSOLE_COLOR.js)
* `CONSOLE_RED(text)` console red
* `CONSOLE_GREEN(text)` console green
* `CONSOLE_BLUE(text)` console blue
* `CONSOLE_YELLOW(text)` console yellow


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
		<script>
			BROWSER_CONFIG.fixScriptsFolderPath = 'UPPERCASE.JS-BROWSER-FIX';
			LOAD('UPPERCASE.JS-BROWSER-FIX/FIX.js');
		</script>
		<script>
			READY(function() {

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
			});
		</script>
	</body>
</html>
```

#### 브라우저 패키지
* `INFO` Browser information object [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/INFO.js)
```javascript
INFO.getLang()
INFO.changeLang(lang) // ex) INFO.changeLang('ko')
INFO.checkIsHDDisplay()
INFO.checkIsTouchableDisplay()
INFO.getBrowserInfo()
```
* `STORE(name)` Browser store class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/STORE.js)
```javascript
store = STORE('testStore');
store.save({ name:, value:, isToSession: })
store.get(name)
store.remove(name)
```
* `MSG({ko:, en:, ...})` get internationalization message. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/I18N/MSG.js)

###### 윈도우 관련
* `TITLE(title)` change document title. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/WINDOW.js)
* `WIN_WIDTH()` get window width. (px) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/WIN_WIDTH.js)
* `WIN_HEIGHT()` get window height. (px) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/WIN_HEIGHT.js)
* `SCROLL_LEFT()` get scroll left. (px) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/SCROLL_LEFT.js)
* `SCROLL_TOP()` get scroll top. (px) [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/SCROLL_TOP.js)

###### NODE 및 DOM 관련
```coffeescript
# CoffeeScript form example
form = FORM ->
  DIV ->
    H5 -> 'Name'
    INPUT name: 'name'
  DIV style: marginTop: 10, ->
    H5 -> 'Gender'
    SELECT name: 'gender', ->
      OPTION value: 'male', ->
        'Male'
      OPTION value: 'female', ->
        'Female'
  DIV style: marginTop: 10, ->
    H5 -> 'Age'
    INPUT name: 'age'
  DIV style: marginTop: 10, ->
    H5 -> 'Profile'
    TEXTAREA name: 'profile'
```
* `NODE` Node interface [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/NODE.js)
* `DOM({tag:})` `DOM({tag:, style:})` `DOM({tag:, c:})` `DOM({tag:, on:})` `DOM({el:})` Dom wrapper class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/DOM.js)
* `BODY` Body class
* `DIV({style:})` `DIV({c:})` `DIV({on:})` Div class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/DIV.js)
* `SPAN({style:})` `SPAN({c:})` `SPAN({on:})` Span class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/SPAN.js)
* `H1({style:})` `H1({c:})` `H1({on:})` H1 class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H2({style:})` `H2({c:})` `H2({on:})` H2 class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H3({style:})` `H3({c:})` `H3({on:})` H3 class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H4({style:})` `H4({c:})` `H4({on:})` H4 class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H5({style:})` `H5({c:})` `H5({on:})` H5 class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H6({style:})` `H6({c:})` `H6({on:})` H6 class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `P({style:})` `P({c:})` `P({on:})` P class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/P.js)
* `BR()` Br class
* `UL({style:})` `UL({c:})` `UL({on:})` Ul class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/UL.js)
* `LI({style:})` `LI({c:})` `LI({on:})` Li class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/UL.js)
* `A({href:})` `A({href:, target:})` `A({style:})` `A({c:})` `A({on:})` A class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/A.js)
* `IMG({src:})` `IMG({style:})` `IMG({c:})` `IMG({on:})` Img class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/IMG.js)
* `TABLE({style:})` `TABLE({c:})` `TABLE({on:})` Table class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `TR({style:})` `TR({c:})` `TR({on:})` Tr class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `TH({style:})` `TH({c:})` `TH({on:})` Th class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `TD({style:})` `TD({c:})` `TD({on:})` Td class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `FORM({action:})` `FORM({target:})` `FORM({method:})` `FORM({enctype:})` `FORM({style:})` `FORM({c:})` `FORM({on:})` Form class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `INPUT({name:})` `INPUT({type:})` `INPUT({placeholder:})` `INPUT({value:})` `INPUT({isMultiple:})` `INPUT({style:})` `INPUT({on:})` Input class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/INPUT.js)
* `TEXTAREA({name:})` `TEXTAREA({placeholder:})` `TEXTAREA({value:})` `TEXTAREA({style:})` `TEXTAREA({c:})` `TEXTAREA({on:})` Textarea class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `SELECT({name:})` `SELECT({value:})` `SELECT({style:})` `SELECT({c:})` `SELECT({on:})` Select class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `OPTION({value:})` `OPTION({style:})` `OPTION({c:})` `OPTION({on:})` Option class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `IFRAME({name:})` `IFRAME({src:})` `IFRAME({style:})` `IFRAME({c:})` `SELECT({on:})` Iframe class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/IFRAME.js)
* `CANVAS()` `CANVAS({width:})` `CANVAS({height:})` `CANVAS({style:})` `CANVAS({c:})` `CANVAS({on:})` Canvas class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/CANVAS.js)
* `CLEAR_BOTH()` create clear:both div. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/CLEAR_BOTH.js)
* `LOADING_BAR()` Loading bar class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/LOADING_BAR.js)

###### 스타일 관련
* `ADD_STYLE({node:, style:})` add style. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/STYLE/ADD_STYLE.js)
* `RGBA([r, g, b, a])` get rgba style string. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/STYLE/RGBA.js)

###### 애니메이션 관련
* `ANIMATE({node:, keyframes:})` `ANIMATE({node:, keyframes:, duration:})` `ANIMATE({node:, keyframes:, timingFunction:})` `ANIMATE({node:, keyframes:, delay:})` `ANIMATE({node:, keyframes:, iterationCount:})` `ANIMATE({node:, keyframes:, direction:})` `ANIMATE({node:, keyframes:, playState:})` `ANIMATE({node:, keyframes:}, callback)` animate node. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/ANIMATION/ANIMATE.js)
* `KEYFRAMES(keyframes)` Animation keyframes class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/ANIMATION/KEYFRAMES.js)

###### 이벤트 관련
* `EVENT(name, func)` `EVENT({node:, name:}, func)` Event class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/EVENT/EVENT.js)
* `EVENT_ONCE(name, func)` `EVENT_ONCE({node:, name:}, func)` Event class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/EVENT/EVENT_ONCE.js)

###### 그래픽 관련
* `CHECK_IS_BLANK_PIXEL({img:, left:, top:}, callback)` `CHECK_IS_BLANK_PIXEL({img:, right:, bottom:}, callback)` check the pixel is blank pixel. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/GRAPHIC/CHECK_IS_BLANK_PIXEL.js)
* `EXPORT_IMG_DATA(img, callback)` export img data. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/GRAPHIC/EXPORT_IMG_DATA.js)
* `EXPORT_IMG_TYPE(img, callback)` export img type. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/GRAPHIC/EXPORT_IMG_TYPE.js)

###### 사운드 관련
* `SOUND({mp3:, ogg:, isLoop:})` SOUND class [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/SOUND.js)
```javascript
sound = SOUND({mp3:'test.mp3', ogg:'test.ogg', isLoop:true});
sound.play()
sound.stop()
```

###### AJAX 관련
로딩 바를 사용하지 않으려면 `isNotUsingLoadingBar` 파라미터를 true로 설정합니다.
* `REQUEST({method:, uri:}, responseListenerOrListeners)` `REQUEST({method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` ajax request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/REQUEST.js)
* `GET(uri, responseListenerOrListeners)` `GET({uri:, paramStr:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax GET request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/GET.js)
* `POST(uri:, responseListenerOrListeners)` `POST({uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax POST request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/POST.js)
* `PUT(uri:, responseListenerOrListeners)` `PUT({uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax PUT request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/PUT.js)
* `DELETE(uri:, responseListenerOrListeners)` `DELETE({uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax DELETE request. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/DELETE.js)

###### VIEW 관련
* `VIEW` View interface [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/VIEW.js)
* `MATCH_VIEW({uri:, target:})` match view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/VIEW.js)
* `HREF(uri)` get href. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/HREF.js)
* `GO()` `GO(uri)` go another view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/GO.js)
* `GO_NEW_WIN()` `GO_NEW_WIN(uri)` go another view on new window. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/GO_NEW_WIN.js)
* `REFRESH()` refresh view. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/REFRESH.js)


## UPPERCASE.JS-PHANTOM
PhantomJS 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
PhantomJS를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-NODE를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.
* 상세 명세는 준비중입니다.

## UPPERCASE.JS-TITANIUM
Titanium 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
Titanium를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-TITANIUM를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.

### Titanium에서 사용하기
* 스크립트를 불러오기 이전에 `global = {};`로 글로벌 변수를 설정합니다.
* `INIT_OBJECTS();`은 한번만 실행합니다.

```javascript
// global
global = {};

// load UPPERCASE.JS.
require('UPPERCASE.JS-COMMON');
require('UPPERCASE.JS-TITANIUM');

if (Ti.Platform.name === 'mobileweb') {
	require('UPPERCASE.JS-BROWSER');
}

// declare.
var
// method
method = METHOD({
	run : function() {
		console.log('HELLO UPPERCASE.JS!');
	}
});

// init all singleton classes.
INIT_OBJECTS();

// execute.
method();
```

* 상세 명세는 준비중입니다.

## UPPERCASE.JS-CORDOVA
Cordova 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
Cordova를 위한 유틸리티를 찾고 계신다면 UPPERCASE.JS-CORDOVA를 사용해보세요.

* UPPERCASE.JS-COMMON.js가 필요합니다.
* UPPERCASE.JS-BROWSER.js가 필요합니다.
* 상세 명세는 준비중입니다.

## Build UPPERCASE.JS
```
cd SRC
node __BUILD.js
```

## License
[MIT](../../LICENSE)

## Author
[Young Jae Sim](https://github.com/Hanul)

## Contact
* [Official Web Site](http://UPPERCASE.IO/#UPPERCASE.JS)
* [Facebook UPPERCASE.IO User Group](https://www.facebook.com/groups/uppercase/)
* [GitHub Issues](https://github.com/UPPERCASE-Series/UPPERCASE.JS/issues)
