/*
 * show error.
 */
global.SHOW_ERROR = function() {
	
	var
	// args
	args = Array.prototype.slice.call(arguments);
	
	if (args[0] !== undefined) {
		args[0] = CONSOLE_RED(args[0]);
	}
	
	args.push(new Date());
	
	return console.log.apply(console, args);
};