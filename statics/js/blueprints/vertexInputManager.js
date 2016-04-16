var popups = require('./../statics/js/blueprints/vertexWindowsManager');

$(document).ready (function () {
	$(window).on('message', function (e) {
		console.log(e.originalEvent.data);
	});

	$('#blueprint').on('click', '.insertNodeMenu-item', function () {
		var attrId = $(this).attr('id');
		switch(attrId) {
			case 'variable':
 				var var_win = window.open(popups.variable);
				break;
		}
	});
});

function createVariable () {

}
