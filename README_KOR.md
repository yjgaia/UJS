# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASEIO/UPPERCASE.JS/master/LOGO.png)
UPPERCASE.JS는 API가 대문자로 이루어진 JavaScript 라이브러입니다. [UPPERCASE.IO](http://UPPERCASE.IO) 등 다양한 프로젝트에서 사용됩니다.

##### Supported System
- node.js
- Web Browsers
- ActionScript 3
- Titanium
- Unity3d

##### Version
1.4.11

### node.js에서 사용하기

[![NPM](https://nodei.co/npm/uppercase.js.png)](https://nodei.co/npm/uppercase.js/)

###### install
	npm install uppercase.js

###### example
    // require('uppercase.js');와 INIT_OBJECTS();은 프로그램 전체에서 한번만 실행합니다.
    require('uppercase.js');

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


### 브라우저에서 사용하기

###### install
	<script>
		global = window;
	</script>
	<script src="UPPERCASE.JS-COMMON.js"></script>
    <script src="UPPERCASE.JS-BROWSER.js"></script>

###### example
    <!doctype html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>UPPERCASE.JS Example</title>
        </head>
        <body>
            <p>
                UPPERCASE.JS Example
            </p>
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



## COMMON
객체지향 프로그래밍 지원 및 다양한 기능을 제공하는 JavaScript 라이브러리입니다.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/COMMON

## BROWSER
웹 브라우저에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/BROWSER
- UPPERCASE.JS-COMMON.js가 필요합니다.

## BROWSER-FIX
COMMON, BROWSER의 구버젼 브라우저(IE6, Android 2.1 Browser 등)를 지원하는 라이브러리입니다.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/BROWSER-FIX
- UPPERCASE.JS-COMMON.js가 필요합니다.
- UPPERCASE.JS-BROWSER.js가 필요합니다.

## NODE
node.js 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/NODE
- UPPERCASE.JS-COMMON.js가 필요합니다.

## PHANTOM
PhantomJS 기반 프로젝트에서 사용 가능한 다양한 기능들을 제공하는 유틸리티 라이브러리입니다.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/PHANTOM
- UPPERCASE.JS-COMMON.js가 필요합니다.

License
-------
[MIT License](https://github.com/UPPERCASEIO/UPPERCASE.JS/blob/master/LICENSE)

Author: Young Jae Sim (http://hanul.me)
