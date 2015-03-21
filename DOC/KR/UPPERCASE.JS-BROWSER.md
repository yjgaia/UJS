# UPPERCASE.JS-BROWSER
웹 브라우저 환경에서 사용할 수 있는 유틸리티 라이브러리 및 DOM(Document Object Model) 템플릿 엔진입니다.

* `UPPERCSE.JS-BROWSER`는 최신 웹 브라우저들에서 돌아가도록 구현되어 있습니다.
구버젼 웹 브라우저들을 지원하기 위해서는 `UPPERCASE.JS-BROWSER-FIX`를 함께 구동시키시기 바랍니다. 관련 내용은 [하단에 수록](#uppercasejs-browser-fix)되어 있습니다.

## 유틸리티
웹 브라우저 환경에서 유용하게 사용될 수 있는 각종 기능들을 모아놓은 것입니다.

## DOM(Document Object Model) 템플릿 엔진
UPPERCASE.JS의 DOM 템플릿 엔진은 순수 JavaScript만을 기반으로 합니다. 따라서 HTML이나 CSS 코드를 작성하지 않습니다. 모든 구현은 JavaScript로 이루어집니다. 그러나 기본적인 Font-end 개발 방법을 알고 있어야 합니다.

## UPPERCASE.JS-BROWSER-FIX
구형 웹 브라우저들을 지원하기 위해, UPPERCASE.JS는 `UPPERCASE.JS-BROWSER-FIX`라는 패키지를 지원하고 있습니다. 이는 객체지향의 상속 기능을 활용하여 구버젼 브라우저에서는 잘 동작하지 않는 기능들을 재작성한 것입니다. *Internet Explorer 5.5*나, *Android 2.1 Browser* 등 현재는 거의 쓰이지 않는 브라우저들까지 지원하기 때문에, 개발자는 브라우저의 하위 호환성을 신경쓰지 않아도 됩니다.












EXPORT_IMG_DATA는 IE8 이하 버젼에서는 메모리 부족으로 제대로 처리되지 않을 수 있습니다.

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
