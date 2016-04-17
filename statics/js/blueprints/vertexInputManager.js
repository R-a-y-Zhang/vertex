var popups = require('./../statics/js/blueprints/vertexWindowsManager');

$(document).ready (function () {
	$(window).on('message', function (e) {
		var data = e.originalEvent.data.split("|");
		if (data[0] == 'variable') {
			var varV = blueprintVariable(100, 100, data[1], data[2]);
			graph.addCell(varV);
		} else if (data[0] == 'condition') {

		} else if (data[0] == 'loop') {

		}
	});

	$('#blueprint').on('click', '.insertNodeMenu-item', function () {
		var attrId = $(this).attr('id');
		switch(attrId) {
			case 'variable':
 				var var_win = window.open(popups.variable);
				break;

			case 'conditional':
				var con_win = window.open(popups.condition);
				break;
		}
	});
});

function createVariable () {

}
