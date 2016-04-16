var popups = require('./../statics/js/blueprints/vertexWindowsManager');

$(document).ready (function () {
	$('#blueprint').on('click', '.insertNodeMenu-item', function () {
		var attrId = $(this).attr('id');
		switch(attrId) {
			case 'variable':
 				var var_win = popups.variable();
				break;
		}
	});
});

function createVariable () {

}
