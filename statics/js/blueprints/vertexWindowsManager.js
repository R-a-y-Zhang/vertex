var path = require('path');
var gui = window.require('nw.gui');

var HTMLS_PG = '../htmls/node-creation-windows/';

var open_var_win = function () {
	// console.log("OKAY");
	var var_win = gui.Window.open(path.join(HTMLS_PG, 'variable_create.html'), {
		'toolbar': true,
		'min_width': 400,
		'min_height': 200,
		'max_width': 400,
		'max_height': 200
	});
	console.log(var_win);
}

exports.variable = open_var_win;
