var path = require('path');
var dirs = require('./directoriesManager');
console.log(dirs);
var blm = require(path.join(dirs.module.root, dirs.module.blueprintsDir, 'blueprintsManager.js'));
$(document).ready(function () {
	var graph = blm.setNewPaper($('#blueprint'), 200, 200);
});
