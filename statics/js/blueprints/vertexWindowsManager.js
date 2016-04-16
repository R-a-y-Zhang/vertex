var path = require('path');
var gui = window.require('nw.gui');

var HTMLS_PG = '../htmls/node-creation-windows/';

var open_var_win = function () {
	var var_win = gui.Window.open(path.join(HTMLS_PG, 'variable_create.html'), {
		'toolbar': true,
		'resizable': false
	});
	var_win.on( 'loaded', function () {
		var_win.focus();
	});
};
exports.variable = open_var_win;
