# 웹 사이트 만들기

##### HTML 파일을 불러와 구성하기
```javascript
WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
	if (uri === '') {
		uri = 'index';
	}
	
	uri = uri + '.html';
	
	READ_FILE(uri, {
		
        // 파일이 존재하지 않으면 404
		notExists : function() {
			response(404);
		},
		
        // 파일이 
		success : function(buffer) {
			response({
				buffer : buffer
			});
		}
	});
});
```

### 템플릿 엔진 붙히기

##### Jade 사용하기
JavaScript 기반 템플릿 엔진엔 Jade(http://jade-lang.com)를 사용하여 사이트 만들기
```javascript
var
//IMPORT: Jade
Jade = require('jade');

WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
	'use strict';

	var
	// uri
	uri = requestInfo.uri;
	
    // 경로가 '' 이면 index로 변경
	if (uri === '') {
		uri = 'index';
	}
	
    // 경로에 .jade를 붙힘
	uri = uri + '.jade';
	
    // 파일이 존재하면,
	CHECK_IS_EXISTS_FILE(uri, function(isExists) {
		
        // Jade로 렌더링하여 출력
		if (isExists === true) {
			response(Jade.renderFile(uri,
			// params	
			{
				pageTitle : 'Page Title'
			}));
		}
        
        // 파일이 존재하지 않으면 404
        else {
			response(404);
		}
	});
});
```
