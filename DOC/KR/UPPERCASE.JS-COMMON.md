# UPPERCASE.JS-COMMON
브라우저 환경과 Node.js 환경 및 모든 JavaScript 환경(ECMAScript 5 버전 이상)에서 사용할 수 있는 유틸리티 라이브러리입니다.

우선 UPPERCASE.JS의 가장 기본적인 기능인 `METHOD`를 살펴보도록 하겠습니다.

# METHOD
메소드를 생성합니다. 메소드에 static 변수를 지정할 수 있습니다. [예제보기](../../EXAMPLES/COMMON/METHOD.js)

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

## 객체지향 프로그래밍 지원
비록 JavaScript에서 Prototype 기반 객체지향 프로그래밍이 가능하다고는 하나, 표현력에 한계가 있어 [JSFace](https://github.com/tnhu/jsface)나 [oolib.js](http://idya.github.io/oolib/)등의 라이브러리를 사용하는것이 좋습니다.
UPPERCASE.JS는 객체지향 언어들과 비슷한 방식으로 객체지향 프로그래밍을 지원합니다.
