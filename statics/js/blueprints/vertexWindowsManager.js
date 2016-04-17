var path = require('path');

var HTMLS_PG = '../htmls/node-creation-windows/';

var varWindowHTMLPath = path.join(HTMLS_PG, 'variable_create.html');
var conWindowHTMLPath = path.join(HTMLS_PG, 'conditional_create.html');
exports.variable = varWindowHTMLPath;
exports.condition = conWindowHTMLPath;
