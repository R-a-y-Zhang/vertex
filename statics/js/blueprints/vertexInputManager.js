var popups = require('./../statics/js/blueprints/vertexWindowsManager');

$(document).ready (function () {
	$(window).on('message', function (e) {
	var data = e.originalEvent.data.split("|");
		if (data[0] == 'variable') {
			var varV = blueprintVariable(100, 100, data[1], data[2]);
			graph.addCell(varV);
		} else if (data[0] == 'loopCond') {
			if (data[1] === 'if') {
				console.log("IF");
				var ifV = blueprintIf(100, 100);
				graph.addCell(ifV);
			} else if (data[1] === 'while') {
				var whileV = blueprintWhile(100, 100);
				graph.addCell(whileV);
			} else if (data[1] === 'for') {
				var forV = blueprintFor(100, 100);
				graph.addCell(forV);
			}
		} else if (data[0] == 'loop') {

		}
	});

	$('#blueprint').on('click', '.insertNodeMenu-item', function () {
		var attrId = $(this).attr('id');
		switch(attrId) {
			case 'variable':
 				var var_win = window.open(popups.variable);
				break;

			case 'condition':
				var con_win = window.open(popups.condition);
				break;

			case 'function':
				var fn_win = window.open(popups.fn);
				break;
		}
	});
});

function createVariable () {

}
