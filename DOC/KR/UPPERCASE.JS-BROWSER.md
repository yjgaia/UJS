

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