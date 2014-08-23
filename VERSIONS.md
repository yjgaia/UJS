VERSIONS
========
1.4.11 (2014. 8. 18)
- Add afterInit for code executed right after initialization in case of CLASS declaration
- Switch overriding VIEW/close and onParamsChange to on('paramsChange', function(params) {...}) on('close', function() {...})
- Connect tap event to click event in EVENT
- Change CHECK_IS_EXISTS to CHECK_IS_IN
- Change FIND_KEY to FIND
- Add PARALLEL
- Add DOM generate children func param
- Change name DOM/showHandler to attachHandler
- Switch addShowHandler to on('attach', function() {...}), addRemoveHandler -> on('remove', function() {...})
- Add show event when DOM occurs actually
- Change FIRE_ALL to EVENT.fireAll

1.4.10 (2014. 7. 31)
- COPY_ARRAY and COPY_DATA are integrated into COPY
- COMBINE_ARRAY and COMBINE_DATA are also integrated into COMBINE, of which parameter is an array to support combination of any kind of data such as { data1, data2 }
- EXTEND_ARRAY and EXTEND_DATA are unified into EXTEND
- CHECK_ARE_SAME_ARRAYS and CHECK_ARE_SAME_DATA_SET are unified into CHECK_ARE_SAME, of which parameter is just like that of COMBINE

1.4.9 (2014. 7. 29)
- Add REMOVE_FILE, COPY_FILE, MOVE_FILE, CREATE_FOLDER

1.4.8 (2014. 7. 24)
- Add caching to RESOURCE_SERVER

1.4.7 (2014. 7. 21)
- Switch to MIT License

1.3 (2014. 4. 20)
- Branch from UPPERCASE.IO
