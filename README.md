# ![ScreenShot](https://raw.githubusercontent.com/UPPERCASEIO/UPPERCASE.JS/master/LOGO.png)
UPPERCASE.JS is a JavaScript library, in which all APIs are written in uppercase. It can be used for various projects including [UPPERCASE.IO](http://UPPERCASE.IO).

##### Supported System
- node.js
- Web Browsers
- ActionScript 3
- Titanium
- Unity3d

##### Version
1.4.11

### To use it on node.js

[![NPM](https://nodei.co/npm/uppercase.js.png)](https://nodei.co/npm/uppercase.js/)

###### install
	npm install uppercase.js

###### example
    // require('uppercase.js');와 INIT_OBJECTS(); runs only once within a program.
    require('uppercase.js');

    // Declaration
    var
    // method
    method = METHOD({
        run : function() {
            console.log('HELLO UPPERCASE.JS!');
        }
    });

    // init all singleton classes.
    INIT_OBJECTS();

    // Execution
    method();


### To use it on the brower

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

                    // Declaration
                    var
                    // method
                    method = METHOD({
                        run : function() {
                            console.log('HELLO UPPERCASE.JS!');
                        }
                    });

                    // init all singleton classes.
                    INIT_OBJECTS();

                    // Execution
                    method();
                };
            </script>
        </body>
    </html>



## COMMON
A Javascript library for Object-Oriented Programming and includes various features.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/COMMON

## BROWSER
An utility library to provide various features on web browsers.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/BROWSER
- UPPERCASE.JS-COMMON.js is required.

## BROWSER-FIX
A library to support COMMON, BROWSER older-version browers. (IE6, Android 2.1 Browser, etc.)<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/BROWSER-FIX
- UPPERCASE.JS-COMMON.js is required.
- UPPERCASE.JS-BROWSER.js is required.

## NODE
An utility library to provide various features for node.js-based projects.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/NODE
- UPPERCASE.JS-COMMON.js is required.

## PHANTOM
An utility library to provide various features for PhantomJS-based projects.<br>
http://UPPERCASE.IO/#UDOC/UPPERCASE.JS/PHANTOM
- UPPERCASE.JS-COMMON.js is required.

License
-------
[MIT License](https://github.com/UPPERCASEIO/UPPERCASE.JS/blob/master/LICENSE)

Author: Young Jae Sim (http://hanul.me)
