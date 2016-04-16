var popups = require('./../statics/js/blueprints/vertexWindowsManager');

var runtest = function () {
	console.log('test');
};

$(document).ready (function () {
	$('#blueprint').on('click', '.insertNodeMenu-item', function () {
		var attrId = $(this).attr('id');
		switch(attrId) {
			case 'variable':
 				var var_win = popups.variable();
				var_win.emit('
				break;
		}
	});
});

// catches events from vertex popups
