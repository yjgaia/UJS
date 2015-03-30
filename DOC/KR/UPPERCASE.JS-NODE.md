# UPPERCASE.JS-NODE
Node.js 환경에서 사용할 수 있는 유틸리티 라이브러리입니다.

## 파일 처리
파일을 처리하는 다양한 기능들을 소개합니다. 아래 기능들은 `isSync` 파라미터로 callback 없이 바로 처리할 수 있지만, 처리하는 동안 프로세스가 멈추게 되어 성능이 떨어집니다. 특수한 경우가 아니라면 `isSync` 파라미터를 사용하지 마세요.

* `WRITE_FILE` 파일에 내용을 작성합니다. 파일이 없으면 파일을 생성합니다. [예제보기](../../EXAMPLES/NODE/FILE/WRITE_FILE.js)
    * `WRITE_FILE({path:, content:}, callbackOrHandlers)`
    * `WRITE_FILE({path:, buffer:}, callbackOrHandlers)`
    * `WRITE_FILE({path:, content: isSync:})`

    ```javascript
    WRITE_FILE({
		path : 'some.txt',
		content : 'this is text file.'
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		success : function() {
			console.log('success.');
		}
	})
    ```

* `READ_FILE` 파일을 읽어들입니다. `buffer` 형태로 읽어들이기 때문에, 문자열로 변환하려면 `toString` 함수를 이용하시기 바랍니다. [예제보기](../../EXAMPLES/NODE/FILE/READ_FILE.js)
    * `READ_FILE(path, callbackOrHandlers)`
    * `READ_FILE({path:, isSync:})`
    
    ```javascript
    READ_FILE('some.txt', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(buffer) {
			console.log(buffer.toString());
		}
	})
    ```

* `GET_FILE_INFO` 파일의 정보를 읽어들입니다. 파일의 크기(`size`), 생성 시간(`createTime`), 최종 수정 시간(`lastUpdateTime`)을 불러옵니다. [예제보기](../../EXAMPLES/NODE/FILE/GET_FILE_INFO.js)
    * `GET_FILE_INFO(path, callbackOrHandlers)`
    * `GET_FILE_INFO({path:, isSync:})`
    
    ```javascript
    GET_FILE_INFO('some.txt', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(info) {
			// info.size
			// info.createTime
			// info.lastUpdateTime
			console.log(info);
		}
	})
    ```

* `COPY_FILE` 파일을 복사합니다. [예제보기](../../EXAMPLES/NODE/FILE/COPY_FILE.js)
    * `COPY_FILE({from:, to:}, callbackOrHandlers)`
    * `COPY_FILE({from:, to:, isSync:})`

    ```javascript
    COPY_FILE({
		from : 'from.txt',
		to : 'to.txt'
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	});
	```

* `MOVE_FILE` 파일을 옮깁니다. [예제보기](../../EXAMPLES/NODE/FILE/MOVE_FILE.js)
    * `MOVE_FILE({from:, to:}, callbackOrHandlers)`
    * `MOVE_FILE({from:, to:, isSync:})`

    ```javascript
    MOVE_FILE({
		from : 'from.txt',
		to : 'to.txt'
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	});
	```
	
* `REMOVE_FILE` 파일을 삭제합니다. [예제보기](../../EXAMPLES/NODE/FILE/REMOVE_FILE.js)
    * `REMOVE_FILE(path, callbackOrHandlers)`
    * `REMOVE_FILE({path:, isSync:})`

    ```javascript
    REMOVE_FILE('some.txt', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	})
    ```

* `CREATE_FOLDER` 폴더를 생성합니다. [예제보기](../../EXAMPLES/NODE/FILE/CREATE_FOLDER.js)
    * `CREATE_FOLDER(path, callbackOrHandlers)`
    * `CREATE_FOLDER({path:, isSync:})`

    ```javascript
    CREATE_FOLDER('some_folder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		success : function() {
			console.log('success.');
		}
	})
    ```
    
* `FIND_FILE_NAMES` 특정 폴더 내에서 폴더를 제외한 파일들의 이름을 찾습니다. [예제보기](../../EXAMPLES/NODE/FILE/FIND_FILE_NAMES.js)
    * `FIND_FILE_NAMES(path, callbackOrHandlers)`
    * `FIND_FILE_NAMES({path:, isSync:})`

    ```javascript
    FIND_FILE_NAMES('some_folder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(fileNames) {
			console.log(fileNames);
		}
	})
    ```
    
* `FIND_FOLDER_NAMES` 특정 폴더 내에서 파일을 제외한 폴더들의 이름을 찾습니다. [예제보기](../../EXAMPLES/NODE/FILE/FIND_FOLDER_NAMES.js)
    * `FIND_FOLDER_NAMES(path, callbackOrHandlers)`
    * `FIND_FOLDER_NAMES({path:, isSync:})`

    ```javascript
    FIND_FOLDER_NAMES('some_folder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(folderNames) {
			console.log(folderNames);
		}
	})
    ```
    
## HTTP 요청 관련 기능
* `REQUEST` HTTP 요청을 보냅니다. [예제보기](../../EXAMPLES/NODE/REQUEST/REQUEST.js)
    * `REQUEST({host:, port:, method:, uri:}, responseListenerOrListeners)`
    * `REQUEST({host:, method:, uri:, paramStr:}, responseListenerOrListeners)`
    * `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)`

    ```javascript
    REQUEST({
		host : 'github.com',
		isSecure : true,
		method : 'GET',
		uri : 'Hanul/UPPERCASE.JS'
	}, function(content) {
		...
	})
	```
	
* `GET` `method`가 `GET`인 HTTP 요청을 보냅니다. [예제보기](../../EXAMPLES/NODE/REQUEST/GET.js)
	* `GET(url, responseListenerOrListeners)`
    * `GET({host:, port:, uri:, paramStr:, data:}, responseListenerOrListeners)`
    * `GET({host:, port:, isSecure:, uri:}, responseListenerOrListeners)`

    ```javascript
    GET({
		host : 'github.com',
		isSecure : true,
		uri : 'Hanul/UPPERCASE.JS'
	}, function(content) {
		...
	})
	```
	
* `POST` `method`가 `POST`인 HTTP 요청을 보냅니다. [예제보기](../../EXAMPLES/NODE/REQUEST/POST.js)
    * `POST({host:, port:, uri:, paramStr:}, responseListenerOrListeners)`
    * `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `PUT` `method`가 `PUT`인 HTTP 요청을 보냅니다. [예제보기](../../EXAMPLES/NODE/REQUEST/PUT.js)
    * `PUT({host:, port:, uri:, paramStr:}, responseListenerOrListeners)`
    * `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `DELETE` `method`가 `DELETE`인 HTTP 요청을 보냅니다. [예제보기](../../EXAMPLES/NODE/REQUEST/DELETE.js)
    * `DELETE({host:, port:, uri:, paramStr:}, responseListenerOrListeners)`
    * `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `DOWNLOAD` 웹 리소스를 다운로드 합니다. [예제보기](../../EXAMPLES/NODE/REQUEST/DOWNLOAD.js)
    * `DOWNLOAD({url:, path:}, callbackOrHandlers)`
    * `DOWNLOAD({host:, port:, uri:, paramStr:, data:, path:}, callbackOrHandlers)`
    * `DOWNLOAD({host:, port:, isSecure:, uri:, path:}, callbackOrHandlers)`

    ```javascript
    DOWNLOAD({
		host : 'github.com',
		uri : 'Hanul/UPPERCASE.JS/archive/master.zip',
		isSecure : true,
		path : 'UPPERCASE.JS.zip'
	})
	```

## 각종 서버 구현체들
* `SOCKET_SERVER(port, connectionListener)` 소켓 서버를 생성합니다. [예제보기](../../EXAMPLES/NODE/SERVER/SOCKET_SERVER.js)

    ```javascript
    SOCKET_SERVER(8124, function(clientInfo, on, off, send, disconnect) {

        // ip
		clientInfo.ip
		
		// send to client.
		send({
			methodName : 'message',
			data : {
				msg : 'message from server.'
			}
		}, function(retMsg) {
			console.log(retMsg);
		});

        // receive from client.
		on('message', function(data, ret) {
			console.log(data);
			ret('Thanks!');
		});

		// when disconnected
		on('__DISCONNECTED', function() {
			console.log('DISCONNECTED!');
		});
	})
	```

* `CONNECT_TO_SOCKET_SERVER({host:, port:}, connectionListenerOrListeners)` `SOCKET_SERVER`로 만들어진 소켓 서버에 연결합니다. [예제보기](../../EXAMPLES/NODE/CONNECT/CONNECT_TO_SOCKET_SERVER.js)

    ```javascript
    CONNECT_TO_SOCKET_SERVER({
		host : 'localhost',
		port : 8124
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		success : function(on, off, send, disconnect) {

			// send to client.
    		send({
    			methodName : 'message',
    			data : {
    				msg : 'message from server.'
    			}
    		}, function(retMsg) {
    			console.log(retMsg);
    		});
    
            // receive from client.
    		on('message', function(data, ret) {
    			console.log(data);
    			ret('Thanks!');
    		});
    
    		// when disconnected
    		on('__DISCONNECTED', function() {
    			console.log('DISCONNECTED!');
    		});
		}
	})
	```
	
* `WEB_SERVER` 웹 서버를 생성합니다. `response` 함수로 클라이언트에 응답할 때, `version` 파라미터를 지정하면 응답이 캐싱됩니다. [예제보기](../../EXAMPLES/NODE/SERVER/WEB_SERVER.js)
    * `WEB_SERVER(port, requestListener)`
    * `WEB_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:}, requestListener)`

    ```javascript
    WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
    
        // ip
        requestInfo.ip

		response('Welcome to UPPERCASE.JS web server!');
		// or
		response({
			buffer : ...,
			headers : {
			    ...
			}
		});
	})
    ```
    
* `RESOURCE_SERVER` 각종 리소스들을 제공하기 위한 서버를 생성합니다. 기본적으로 리소스의 응답을 캐싱합니다. 캐싱을 원하지 않을 경우, `CONFIG.isDevMode`를 true로 설정하시면 됩니다. 자세한 내용은 [Configuration](CONFIG.md) 문서를 참고해주세요. [예제보기](../../EXAMPLES/NODE/SERVER/RESOURCE_SERVER.js)
    * `RESOURCE_SERVER({port:, rootPath:}, requestListenerOrHandlers)`
    * `RESOURCE_SERVER({port:, rootPath:, version:}, requestListenerOrHandlers)`
    * `RESOURCE_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:, rootPath:}, requestListenerOrHandlers)`

    ```javascript
    // R 폴더에 있는 리소스의 경로와 URI를 비교하여, 해당하는 리소스를 제공합니다.
    // 이를테면 R 폴더에 image.png가 존재한다면, http://localhost:8123/image.png 로 접속하면 해당 이미지가 제공됩니다.
    RESOURCE_SERVER({
		port : 8123,
		rootPath : __dirname + '/R'
	})
	```

* `UDP_SERVER` UDP 프로토콜로 통신하는 서버를 생성합니다. [예제보기](../../EXAMPLES/NODE/SERVER/UDP_SERVER.js)
    * `UDP_SERVER(port, requestListener)`
    * `UDP_SERVER({port:, ipVersion}, requestListener)`

    ```javascript
    UDP_SERVER(8124, function(requestInfo, response) {
        
        // request informations
        requestInfo.ip
        requestInfo.port
        requestInfo.content

		response('Welcome to UPPERCASE.JS UDP server!');
	})
    ```

## 암호화
* `SHA1({password:, key:})` SHA1 암호화를 거친 문자열이 생성됩니다. 암호화에는 암호화가 될 대상이되는 `password`와, 암호화에 필요한 `key`가 필요합니다. [예제보기](../../EXAMPLES/NODE/ENCRYPTION/SHA1.js)

    ```javascript
    // '16dd1fdd7c595eab4586cebba6b34eaff41acc53'
    SHA1({
		password : '1234',
		key : 'test'
	})
	```

## 클러스터링 관련 기능
* `CPU_CLUSTERING(work)` CPU 클러스터링을 수행합니다. 이를 통해 멀티코어 CPU에 대응할 수 있습니다. [예제보기](../../EXAMPLES/NODE/CLUSTERING/CPU_CLUSTERING.js)

    ```javascript
    CPU_CLUSTERING(function() {
    
        // 1, 2, 3, 4, ... (CPU count)
        CPU_CLUSTERING.getWorkerId()
        
        ...
	})
    ```

* `SERVER_CLUSTERING({servers:, thisServerName:, port:}, work)` 서버 클러스터링을 수행합니다. 이를 통해 분산 서버를 구성할 수 있습니다. [예제보기](../../EXAMPLES/NODE/CLUSTERING/SERVER_CLUSTERING.js)

    ```javascript
    SERVER_CLUSTERING({
		servers : {
			serverA : '127.0.0.1',
			serverB : '127.0.0.1'
		},
		thisServerName : 'serverA',
		port : 8125
	}, function() {
	    ...
	})
    ```

* `SHARED_STORE(name)` 클러스터링 된 CPU들과 서버들이 공유하는 저장소입니다. 저장할 때 `removeAfterSeconds` 파라미터를 지정하면 특정 시간 이후 데이터를 자동으로 지울수도 있습니다. [예제보기](../../EXAMPLES/NODE/CLUSTERING/SHARED_STORE.js)

    ```javascript
    CPU_CLUSTERING(function() {

		SERVER_CLUSTERING({
			servers : {
				serverA : '127.0.0.1',
				serverB : '127.0.0.1'
			},
			thisServerName : 'serverA',
			port : 8125
		}, function() {

			var
			// shared store
			sharedStore = SHARED_STORE('sharedStore');

			if (CPU_CLUSTERING.getWorkerId() === 1) {

				sharedStore.save({
					name : 'msg',
					value : 'Hello World!',
					removeAfterSeconds : 2
				})
			}
			
			sharedStore.get('msg')
			
			sharedStore.remove('msg')
		});
	});
    ```

## 콘솔 로그 색상
[예제보기](../../EXAMPLES/NODE/CONSOLE_COLOR/CONSOLE_COLOR.js)

* `CONSOLE_RED(text)` 콘솔에 `text`를 빨간색으로 출력합니다.
* `CONSOLE_GREEN(text)` 콘솔에 `text`를 초록색으로 출력합니다.
* `CONSOLE_BLUE(text)` 콘솔에 `text`를 파란색으로 출력합니다.
* `CONSOLE_YELLOW(text)` 콘솔에 `text`를 노란색으로 출력합니다.

다음 문서: [Configuration](CONFIG.md)
