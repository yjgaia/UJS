

`UPPERCSE.JS-BROWSER.js`는 최신 웹 브라우저들에서 돌아가도록 구현되어 있습습니다.
구버젼 웹 브라우저들을 지원하기 위해서는 `UPPERCASE.JS-BROWSER-FIX`를 함께 구동시키시기 바랍니다.


EXPORT_IMG_DATA는 IE8 이하 버젼에서는 메모리 부족으로 제대로 처리되지 않을 수 있습니다.

###### UPPERCASE.JS-BROWSER
웹 브라우저에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.
모든 브라우저와 호환되는 브라우저용 유틸리티와 웹 애플리케이션 개발용 템플릿 엔진을 찾으신다면 UPPERCASE.JS-BROWSER를 사용해보세요.

	UPPERCASE.JS-BROWSER는 웹 애플리케이션(하이브리드 앱이나 게임 등)을 제작하는데 최적화 되어 있습니다. 문서 기반의 웹 사이트 개발을 위해서는 jQuery나 AngluarJS 등 다른 훌륭한 라이브러리들을 사용하시는 편이 좋습니다.

* 객체지향의 상속을 활용한 구버젼 브라우저 지원
* 브라우저를 위한 유틸리티
* 순수 JS 기반 DOM 엔진




### 구버젼 브라우저에서 작동하지 않는 기능들
아래 기능들은 구버젼 브라우저에서는 작동하지 않는 기능들입니다. 다만, 호환성을 중요시하는 UPPERCASE.JS 특성상 오류를 발생시키지는 않습니다.

* AUDIO
* VIDEO

### HTML5 Canvas 지원
FlashCanvas를 이용해 구버젼 브라우저에서도 플래시를 통한 HTML5 Canvas가 지원됩니다.
그러나 제공하는 기능에 제약이 있으므로, 제대로 된 Canvas 기능을 사용하시려면 `CANVAS`의 `getEl` 메소드로 element를 가져 온 뒤에 처리하시기 바랍니다.
이럴 경우, UPPERCASE.JS가 제공하는 하위 호환성은 무시됩니다.

```javascript
var canvas = CANVAS();
var canvasEl = canvas.getEl();
```


IE10 미만의 브라우저에서는 CROS(Cross-Origin Resource Sharing)가 작동하지 않습니다.
