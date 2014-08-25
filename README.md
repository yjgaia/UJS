# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASE-Series/UPPERCASE.JS/master/LOGO.png)
Easy, Clear, and Powerful Full-stack (server-to-client) JavaScript Library for Dynamic Web Site Development. All the APIs are written uppercase. Used in [UPPERCASE.IO](http://UPPERCASE.IO) .

###### COMPONENTS
* [UPPERCASE.JS-COMMON](#uppercasejs-common)
* [UPPERCASE.JS-NODE](#uppercasejs-node)
* [UPPERCASE.JS-BROWSER](#uppercasejs-browser)
* [UPPERCASE.JS-PHANTOM](#uppercasejs-phantom)
* [UPPERCASE.JS-TITANIUM](#uppercasejs-titanium)

###### TRANSLATION
* [한국어 문서](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/README_KOR.md)

## UPPERCASE.JS-COMMON
Provides OOP support and various features.
UPPERCASE.JS-COMMON is for those who seek for JavaScript utilities.

* Create `METHOD` method. Can specify a static variable inside. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/METHOD.js)
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
	// static variable
	m.staticString = 'Static!';
	return {
		run: function(params, callback) {...}
	};
});
method.staticString // 'Static!'
```

#### `OOP` State-of-art OOP
* Declare `CLASS` class. Can inherit and set accessors such as private, protected, and public. Can modify parameters before instantiation and specify static variables. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/OOP/CLASS.js)
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
	// Set initial parameters.
	params: function() {
		return {...};
	},
	// Modify the parameters or inherit from the parent CLASS.
	preset: function(params, funcs) {
		...
		return parentClass;
	},
	// Initialize instantiation.
	init: function(inner, self, params, funcs) {
		inner.a // protected for children.
		self.b // exposed to public.
		...
	},
	// Post-initialize.
	afterInit: function(inner, self, params, funcs) {...}
});
```
```javascript
Sample = CLASS(function(c) {
	// static variable
	c.staticString = 'Static!';
	return {
		init: function(inner, self, params, funcs) {...}
	};
});
Sample.staticString // 'Static!'
```
* Declare `OBJECT` object. Initialize via `INIT_OBJECTS()` after every OBJECT is declared. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/OOP/OBJECT.js)
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

#### `UTIL` essential utilities

###### Number
* `INTEGER(integerString)` convert integer string to integer number. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NUMBER/INTEGER.js)
* `REAL(realString)` convert real string to real number. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NUMBER/REAL.js)
* `RANDOM(max)` `RANDOM({min:, max:})` `RANDOM({min:, limit:})` generate random integer. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NUMBER/RANDOM.js)

###### DATA and array
* `CHECK_IS_DATA(it)` check it is data. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA/CHECK_IS_DATA.js)
* `CHECK_IS_EMPTY_DATA(data)` check data is empty. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA/CHECK_IS_EMPTY_DATA.js)
* `CHECK_IS_ARRAY(it)` check it is array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/ARRAY/CHECK_IS_ARRAY.js)
* `CHECK_ARE_SAME(array)` check are same all elements in array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/ARRAY/CHECK_ARE_SAME.js)
* `CHECK_IS_IN({data:, value:})` `CHECK_IS_IN({array:, value:})` check is exists value in data or array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/CHECK_IS_IN.js)
* `COMBINE(data)` `COMBINE(array)` combine data set or arrays. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/COMBINE.js)
* `COPY(data)` `COPY(array)` copy data or array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/COPY.js)
* `EXTEND({origin:, extend:})` extend data or array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/EXTEND.js)
* `FIND({data:, value:})` `FIND({array:, value:})` find name or key in data or array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/FIND.js)
* `REMOVE({data:, name:})` `REMOVE({data:, value:})` `REMOVE({array:, key:})` `REMOVE({array:, value:})` `REMOVE(dataOrArray, function(value) {})` remove at name or key or some value in data or array. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATA_AND_ARRAY/REMOVE.js)

###### Date
* `CALENDAR()` `CALENDAR(date)` Calendar class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DATE/CALENDAR.js)
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

###### Function
* `RUN(function(func) {})` just run. use this if you need a code block. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/FUNCTION/RUN.js)
* `RAR(function() {})` `RAR(params, function(params) {})` run `func` and return it. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/FUNCTION/RAR.js)

###### Loop
* `REPEAT(count, function(i) {})` `REPEAT({start:, end:}, function(i) {})` `REPEAT({start:, end:, step:}, function(i) {})` `REPEAT({start:, limit:}, function(i) {})` `REPEAT({start:, limit:, step:}, function(i) {})` run `func` repeat `count` time, or same as `for`. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/REPEAT/REPEAT.js)
* `EACH(data, function(value) {})` `EACH(array, function(value) {})` same as `foreach`. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/REPEAT/EACH.js)

###### Delay
* `DELAY(seconds, function(delay) {})` Delay class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DELAY/DELAY.js)
```javascript
delay = DELAY(3, function(delay) {});
delay.remove()
```
* `INTERVAL(seconds, function(interval) {})` Interval class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DELAY/INTERVAL.js)
```javascript
interval = INTERVAL(3, function(interval) {});
interval.remove()
```
* `LOOP(fps, function() {})` `LOOP(fps, {start: function() {}, interval: function() {}, end: function() {}})` Loop class (for game etc.) [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/DELAY/LOOP.js)
```javascript
loop = LOOP(100, {start: function() {}, interval: function() {}, end: function() {}});
loop.changeFPS(fps) // ex) loop.changeFPS(60)
loop.remove()
```

###### Etc.
* `RANDOM_STR(length)` generate random string. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/RANDOM_STR.js)
* `OVERRIDE(origin, function(origin) {})` override something. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/OVERRIDE.js)
* `NEXT([function(next) {}, function() { return function() {}; }, function() { return function() {}; }, ...])` `NEXT(count, [function(i, next) {}, function() { return function() {}; }, ...])` `NEXT(array, [function(element, next) {}, function() { return function() {}; }, ...])` async control-flow method that makes stepping through logic easy. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/NEXT.js)
* `PARALLEL([function(done) {}, function(done) {}, ..., function() {}])` `PARALLEL(count, [function(done) {}, function() {}])` `PARALLEL(array, [function(value, done) {}, function() {}])` run funcs in parallel. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/PARALLEL.js)
* `STRINGIFY(value)` stringify object. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/STRINGIFY.js)
* `PARSE_STR(objectString)` parse stringified object. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/PARSE_STR.js)
* `VALID(validDataSet)` Data validation class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/COMMON/UTIL/VALID.js)
```javascript
validResult = VALID(validData).check({
     data : data
});
validResult.checkHasError()
validResult.getErrors()
```

## UPPERCASE.JS-NODE
Provide a bunch of features useful for node.js-based projects.
UPPERCASE.JS-NODE is for those who seek for node.js utilities.

* UPPERCASE.JS-COMMON.js is required.

### How to use on node.js
* `INIT_OBJECTS();` is executed once.

```javascript
require('UPPERCASE.JS-COMMON.js');
require('UPPERCASE.JS-NODE.js');

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

#### Node package

###### Clustering
* `CPU_CLUSTERING(work)` cpu clustering work. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CLUSTERING/CPU_CLUSTERING.js)
* `SERVER_CLUSTERING({hosts:, thisServerHost:, port:}, work)` server clustering work. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CLUSTERING/SERVER_CLUSTERING.js)
* `SHARED_STORE(name)` Cpu and server clustering shared store class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CLUSTERING/SHARED_STORE.js)

###### File
* `WRITE_FILE({path:, content:}, callbackOrHandlers)` `WRITE_FILE({path:, buffer:}, callbackOrHandlers)` `WRITE_FILE({path:, content: isSync:}, callbackOrHandlers)` write file. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/WRITE_FILE.js)
* `READ_FILE(path, callbackOrHandlers)` `READ_FILE({path:, isSync:}, callbackOrHandlers)` read file. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/READ_FILE.js)
* `COPY_FILE({srcPath:, distPath:}, callbackOrHandlers)` `COPY_FILE({srcPath:, distPath:, isSync:}, callbackOrHandlers)` copy file. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/COPY_FILE.js)
* `MOVE_FILE({srcPath:, distPath:}, callbackOrHandlers)` `MOVE_FILE({srcPath:, distPath:, isSync:}, callbackOrHandlers)` move file. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/MOVE_FILE.js)
* `REMOVE_FILE(path, callbackOrHandlers)` `REMOVE_FILE({path:, isSync:}, callbackOrHandlers)` remove file. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/REMOVE_FILE.js)
* `CREATE_FOLDER(path, callbackOrHandlers)` `CREATE_FOLDER({path:, isSync:}, callbackOrHandlers)` remove file. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/CREATE_FOLDER.js)
* `FIND_FILE_NAMES(path, callbackOrHandlers)` `FIND_FILE_NAMES({path:, isSync:}, callbackOrHandlers)` find file names. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/FIND_FILE_NAMES.js)
* `FIND_FOLDER_NAMES(path, callbackOrHandlers)` `FIND_FOLDER_NAMES({path:, isSync:}, callbackOrHandlers)` find folder names. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/FILE/FIND_FOLDER_NAMES.js)

###### HTTP Request
* `REQUEST({host:, port:, method:, uri:}, responseListenerOrListeners)` `REQUEST({host:, method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` http request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/REQUEST.js)
* `GET({host:, port:, uri:, paramStr:, data:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:}, responseListenerOrListeners)` http GET request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/GET.js)
* `POST({host:, port:, uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` http POST request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/POST.js)
* `PUT({host:, port:, uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` http PUT request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/PUT.js)
* `DELETE({host:, port:, uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` http DELETE request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/REQUEST/DELETE.js)

###### Server
* `SOCKET_SERVER(port, connectionListener)` create socket server. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/SOCKET_SERVER.js)
* `CONNECT_TO_SOCKET_SERVER({host:, port:}, connectionListenerOrListeners)` connect to socket server. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CONNECT/CONNECT_TO_SOCKET_SERVER.js)
* `WEB_SERVER(port, requestListener)` `WEB_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:}, requestListener)` create web server. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/WEB_SERVER.js)
* `RESOURCE_SERVER({port:, rootPath:}, requestListenerOrHandlers)` `RESOURCE_SERVER({port:, rootPath:, version:}, requestListenerOrHandlers)` `RESOURCE_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:, rootPath:}, requestListenerOrHandlers)` create resourec server. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/RESOURCE_SERVER.js)

###### Encryption
* `SHA1({key:, password:})` SHA1 encrypt. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/ENCRYPTION/SHA1.js)

###### Console [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CONSOLE_COLOR/CONSOLE_COLOR.js)
* `CONSOLE_RED(text)` console red
* `CONSOLE_GREEN(text)` console green
* `CONSOLE_BLUE(text)` console blue
* `CONSOLE_YELLOW(text)` console yellow


## UPPERCASE.JS-BROWSER
Provide a bunch of features useful for web browsers.
UPPERCASE.JS-BROWSER is for those who seek for handy utilities and powerful template engines compliant with all the browsers on the earth.

* UPPERCASE.JS-COMMON.js is required.

### UPPERCASE.JS-BROWSER-FIX
Support old browsers (IE5.5, Android 2.1 Browser, ...) with COMMON and BROWSER.

* UPPERCASE.JS-COMMON.js is required.
* UPPERCASE.JS-BROWSER.js is required.

### How to use in a browser
* Set `global = window;` to prepare a global variable prior to loading scripts.
* `INIT_OBJECTS();` is executed once.

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
			global.onload = function() {

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
			};
		</script>
	</body>
</html>
```

#### Browser Package
* `INFO` Browser information object [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/INFO.js)
```javascript
INFO.getLang()
INFO.changeLang(lang) // ex) INFO.changeLang('ko')
INFO.checkIsHDDisplay()
INFO.checkIsTouchableDisplay()
INFO.getBrowserInfo()
```
* `STORE(name)` Browser store class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/STORE.js)
```javascript
store = STORE('testStore');
store.save({ name:, value:, isToSession: })
store.get(name)
store.remove(name)
```
* `MSG({ko:, en:, ...})` get internationalization message. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/I18N/MSG.js)

###### Window
* `TITLE(title)` change document title. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/WINDOW.js)
* `WIN_WIDTH()` get window width. (px) [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/WIN_WIDTH.js)
* `WIN_HEIGHT()` get window height. (px) [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/WIN_HEIGHT.js)
* `SCROLL_LEFT()` get scroll left. (px) [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/SCROLL_LEFT.js)
* `SCROLL_TOP()` get scroll top. (px) [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/tree/master/EXAMPLES/BROWSER/SCROLL_TOP.js)

###### NODE and DOM
```coffeescript
# form example
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
* `NODE` Node interface [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/NODE.js)
* `DOM({tag:})` `DOM({tag:, style:})` `DOM({tag:, c:})` `DOM({tag:, on:})` `DOM({el:})` Dom wrapper class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/DOM.js)
* `BODY` Body class
* `DIV({style:})` `DIV({c:})` `DIV({on:})` Div class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/DIV.js)
* `SPAN({style:})` `SPAN({c:})` `SPAN({on:})` Span class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/SPAN.js)
* `H1({style:})` `H1({c:})` `H1({on:})` H1 class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H2({style:})` `H2({c:})` `H2({on:})` H2 class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H3({style:})` `H3({c:})` `H3({on:})` H3 class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H4({style:})` `H4({c:})` `H4({on:})` H4 class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H5({style:})` `H5({c:})` `H5({on:})` H5 class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `H6({style:})` `H6({c:})` `H6({on:})` H6 class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/H1.js)
* `P({style:})` `P({c:})` `P({on:})` P class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/P.js)
* `BR()` Br class
* `UL({style:})` `UL({c:})` `UL({on:})` Ul class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/UL.js)
* `LI({style:})` `LI({c:})` `LI({on:})` Li class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/UL.js)
* `A({href:})` `A({href:, target:})` `A({style:})` `A({c:})` `A({on:})` A class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/A.js)
* `IMG({src:})` `IMG({style:})` `IMG({c:})` `IMG({on:})` Img class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/IMG.js)
* `TABLE({style:})` `TABLE({c:})` `TABLE({on:})` Table class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `TR({style:})` `TR({c:})` `TR({on:})` Tr class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `TH({style:})` `TH({c:})` `TH({on:})` Th class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `TD({style:})` `TD({c:})` `TD({on:})` Td class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
* `FORM({action:})` `FORM({target:})` `FORM({method:})` `FORM({enctype:})` `FORM({style:})` `FORM({c:})` `FORM({on:})` Form class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `INPUT({name:})` `INPUT({type:})` `INPUT({placeholder:})` `INPUT({value:})` `INPUT({isMultiple:})` `INPUT({style:})` `INPUT({on:})` Input class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/INPUT.js)
* `TEXTAREA({name:})` `TEXTAREA({placeholder:})` `TEXTAREA({value:})` `TEXTAREA({style:})` `TEXTAREA({c:})` `TEXTAREA({on:})` Textarea class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `SELECT({name:})` `SELECT({value:})` `SELECT({style:})` `SELECT({c:})` `SELECT({on:})` Select class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `OPTION({value:})` `OPTION({style:})` `OPTION({c:})` `OPTION({on:})` Option class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/FORM.js)
* `IFRAME({name:})` `IFRAME({src:})` `IFRAME({style:})` `IFRAME({c:})` `SELECT({on:})` Iframe class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/IFRAME.js)
* `CANVAS()` `CANVAS({width:})` `CANVAS({height:})` `CANVAS({style:})` `CANVAS({c:})` `CANVAS({on:})` Canvas class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/TAG/CANVAS.js)
* `CLEAR_BOTH()` create clear:both div. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/CLEAR_BOTH.js)

###### Styles
* `ADD_STYLE({node:, style:})` add style. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/STYLE/ADD_STYLE.js)
* `RGBA([r, g, b, a])` get rgba style string. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/STYLE/RGBA.js)

###### Animations
* `ANIMATE({node:, keyframes:})` `ANIMATE({node:, keyframes:, duration:})` `ANIMATE({node:, keyframes:, timingFunction:})` `ANIMATE({node:, keyframes:, delay:})` `ANIMATE({node:, keyframes:, iterationCount:})` `ANIMATE({node:, keyframes:, direction:})` `ANIMATE({node:, keyframes:, playState:})` `ANIMATE({node:, keyframes:}, callback)` animate node. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/ANIMATION/ANIMATE.js)
* `KEYFRAMES(keyframes)` Animation keyframes class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/ANIMATION/KEYFRAMES.js)

###### Events
* `EVENT(name, func)` `EVENT({node:, name:}, func)` Event class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/EVENT/EVENT.js)
* `EVENT_ONCE(name, func)` `EVENT_ONCE({node:, name:}, func)` Event class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/DOM/EVENT/EVENT_ONCE.js)

###### Graphics
* `CHECK_IS_BLANK_PIXEL({img:, left:, top:}, callback)` `CHECK_IS_BLANK_PIXEL({img:, right:, bottom:}, callback)` check the pixel is blank pixel. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/GRAPHIC/CHECK_IS_BLANK_PIXEL.js)
* `EXPORT_IMG_DATA(img, callback)` export img data. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/GRAPHIC/EXPORT_IMG_DATA.js)
* `EXPORT_IMG_TYPE(img, callback)` export img type. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/GRAPHIC/EXPORT_IMG_TYPE.js)

###### Sounds
* `SOUND({mp3:, ogg:, isLoop:})` SOUND class [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/SOUND.js)
```javascript
sound = SOUND({mp3:'test.mp3', ogg:'test.ogg', isLoop:true});
store.play()
store.stop()
```

###### AJAX
* `REQUEST({method:, uri:}, responseListenerOrListeners)` `REQUEST({method:, uri:, paramStr:}, responseListenerOrListeners)` `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)` ajax request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/REQUEST.js)
* `GET(uri, responseListenerOrListeners)` `GET({uri:, paramStr:}, responseListenerOrListeners)` `GET({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax GET request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/GET.js)
* `POST(uri:, responseListenerOrListeners)` `POST({uri:, paramStr:}, responseListenerOrListeners)` `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax POST request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/POST.js)
* `PUT(uri:, responseListenerOrListeners)` `PUT({uri:, paramStr:}, responseListenerOrListeners)` `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax PUT request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/PUT.js)
* `DELETE(uri:, responseListenerOrListeners)` `DELETE({uri:, paramStr:}, responseListenerOrListeners)` `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)` ajax DELETE request. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/REQUEST/DELETE.js)

###### VIEW
* `VIEW` View interface [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/VIEW.js)
* `MATCH_VIEW({uris:, target:})` match view. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/VIEW.js)
* `HREF(uri)` get href. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/HREF.js)
* `GO(uri)` go another view. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/GO.js)
* `GO_NEW_WIN(uri)` go another view on new window. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/GO_NEW_WIN.js)
* `REFRESH()` refresh view. [EXAMPLE](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/BROWSER/VIEW/REFRESH.js)


## UPPERCASE.JS-PHANTOM
Provide a number of features useful for PhantomJS-based projects.
UPPERCASE.JS-PHANTOM is for those who seek for utilities on PhantomJS.

* UPPERCASE.JS-COMMON.js is required.
* More details are coming soon.

## UPPERCASE.JS-TITANIUM
Provide enormous features useful for Titanium-based projects.
UPPERCASE.JS-TITANIUM is for those who look for utilities on Titanium.

* UPPERCASE.JS-COMMON.js is required.
* More details are coming soon.

## License
[MIT](LICENSE)

## Author
[Young Jae Sim](https://github.com/Hanul)
