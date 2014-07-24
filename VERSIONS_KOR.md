VERSIONS
========
1.4.8 (2014. 7. 24)
- RESOURCE_SERVER의 캐싱 처리

1.4.7 (2014. 7. 21)
- MIT License로 변경

1.4.6 (2014. 7. 19)
- OOP와 UTIL을 COMMON으로 통합
- REMOVE와 REMOVE_AT을 통합 (REMOVE에서 key를 넘기면 REMOVE_AT과 같이 동작)
- NODE/CONNECT 추가
- NODE/ENCRYPTION 추가
- NODE/FILE 추가
- NODE/REQUEST 추가
- NODE/SERVER 추가

1.4.5 (2014. 6. 22)
- OOP 개선 (OOP-EXAMPLE 참고)

1.4.4 (2014. 6. 12)
- DOM.children -> DOM.c, DOM.removeAllChildren -> DOM.empty로 변경

1.4.3 (2014. 5. 30)
- NODE/CLUSTERING 추가
- data를 문자열로 변환해주는 UTIL/DATA/STRINGIFY_DATA 추가
- 문자열로 변환된 data를 다시 복구해주는 UTIL/DATA/PARSE_DATA_STR 추가
- BROWSER/AJAX_JSON, GET_JSON, POST_JSON, PUT_JSON, DELETE_JSON 제거
- DOM 제거시 EVENT 제거 처리 개선
- IE11에서 touchstart, touchmove, touchend가 제거되지 않는 버그 수정

1.4.2 (2014. 5. 24)
- remove UPPERCASE.JS.
- rename UPPERCASE-{}.js to UPPERCASE.JS-{}.js.

1.4.1 (2014. 5. 22)
- BOX 기능 UPPERCASE.IO-OCTOPUS로 이전
- 스크립트를 head에 적용해도 작동하도록 변경
- FOR에서 end가 start 보다 작은 경우 처리
- STORE에 저장되는 값의 type을 유지

1.4
- Windows 8 기반 태블릿 터치 대응
- CSS position: fixed를 지원하지 않는 브라우저에서는 시뮬레이션
- IE에서의 DOM.getLeft, DOM.getTop 버그 개선
- DOM.addAfterShowProc/DOM.addAfterRemoveProc를 DOM.addShowHandler/DOM.addRemoveHandler로 변경
- INFO.checkIsSupportFixed 제거, fixed 기능을 제공하지 않는 브라우저는 에뮬레이트
- INFO.checkIsSupportCanvas 제거, canvas를 제공하지 않는 IE8, 7, 6 버젼에서는 FlashCanvas로 대체
- UTIL/CALENDAR에서 파라미터가 없으면 현재 시각을 기준으로 작동되도록 변경
- BROWSER-UTIL/ANIMATE 기본 애니메이션 작동 시간 1초에서 0.5초로 변경

1.3 (2014. 4. 20)
- UPPERCASE.IO에서 분리
