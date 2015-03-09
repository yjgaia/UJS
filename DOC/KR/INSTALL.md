# UPPERCASE.JS 설치하기
UPPERCASE.JS를 설치하는 방법은 아주 쉽습니다. 사실, 설치과정 없이 불러오기만 하면 됩니다.

## 웹 페이지에서
웹 페이지에서는 `script` 태그로 UPPERCASE.JS를 불러옵니다.
```html
<!-- 웹 브라우저 환경에서는 global이 최상위 객체인 window와 같습니다. -->
<script>
    global = window;
</script>
<!-- 공통 라이브러리인 UPPERCASE.JS-COMMON.js와 UPPERCASE.JS-BROWSER.js를 불러옵니다. -->
<script src="/UPPERCASE.JS-COMMON.js"></script>
<script src="/UPPERCASE.JS-BROWSER.js"></script>
<!-- 구버젼 브라우저에 대한 지원과, 각종 브라우저들이 갖고있는 버그를 고쳐주는 BROWSER-FIX를 불러옵니다. -->
<script>
	// BROWSER-FIX 폴더 지정
    BROWSER_CONFIG.fixScriptsFolderPath = '/UPPERCASE.JS-BROWSER-FIX';
    // FIX.js를 불러옵니다.
    LOAD('/UPPERCASE.JS-BROWSER-FIX/FIX.js');
</script>
```

## Node.js기반 프로젝트에서
Node.js는 [CommonJS](http://www.commonjs.org)를 따르므로 `require` 메소드를 제공합니다. `require`로 UPPERCASE.JS를 불러옵니다.
```javascript
// 공통 라이브러리인 UPPERCASE.JS-COMMON.js와 UPPERCASE.JS-NODE.js를 불러옵니다.
require('UPPERCASE.JS-COMMON.js');
require('UPPERCASE.JS-NODE.js');
```

## 다른 솔루션을 기반으로 하는 프로젝트에서
다른 솔루션에서는 공통 라이브러리인 `UPPERCASE.JS-COMMON.js`만 사용할 수 있습니다. Node.js와 같이 [CommonJS](http://www.commonjs.org)를 따른다면 `require` 메소드를, 그 외에 경우라면 각 솔루션에 맞게 `UPPERCASE.JS-COMMON.js`를 불러옵니다.
```javascript
// 공통 라이브러리인 UPPERCASE.JS-COMMON.js를 불러옵니다.
require('UPPERCASE.JS-COMMON.js');
```

다음 문서: [초기화 하기](INIT.md)
