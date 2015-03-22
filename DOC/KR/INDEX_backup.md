
## Configuration
###### BROWSER_CONFIG
각 설정은 `BROWSER_CONFIG.isSupportingX2 = true;` 와 같이 설정합니다.
* `isSupportingX2` 레티나 디스플레이 등을 대응하기 위해 이미지 픽셀을 2배씩 늘려주는 설정을 사용할 경우 `true`로 지정합니다.
* `isUsingFlashCanvasPro` FlashCanvas Pro 버젼을 사용하고자 할 때 `true`로 지정합니다. FlashCanvas Pro의 라이센스를 구매하셔야 합니다. http://flashcanvas.net/purchase
* `fixScriptsFolderPath` BROWSER-FIX 스크립트들이 저장되어 있는 폴더의 경로를 지정합니다.



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
* `UDP_SERVER(port, requestListener)` `UDP_SERVER({port:, ipVersion}, requestListener)` create udp server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/SERVER/UDP_SERVER.js)

###### Encryption
* `SHA1({key:, password:})` SHA1 encrypt. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/ENCRYPTION/SHA1.js)

###### Console [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.JS/blob/master/EXAMPLES/NODE/CONSOLE_COLOR/CONSOLE_COLOR.js)
* `CONSOLE_RED(text)` console red
* `CONSOLE_GREEN(text)` console green
* `CONSOLE_BLUE(text)` console blue
* `CONSOLE_YELLOW(text)` console yellow
