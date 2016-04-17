var path = require('path');

var HTMLS_PG = '../htmls/node-creation-windows/';

var varWindowHTMLPath = path.join(HTMLS_PG, 'variable_create.html');
var conWindowHTMLPath = path.join(HTMLS_PG, 'conditional_create.html');
var funWindowHTMLPath = path.join(HTMLS_PG, 'function.html');
exports.variable = varWindowHTMLPath;
exports.condition = conWindowHTMLPath;
exports.fn = funWindowHTMLPath;
