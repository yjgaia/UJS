var
// store
store = STORE('testStore');

console.log(store.get('msg'));

store.save({
	key : 'msg',
	value : 'This is test message!'
});

console.log(store.get('msg'));

store.remove('msg');

console.log(store.get('msg'));
