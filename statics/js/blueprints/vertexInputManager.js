var popups = require('./../statics/js/blueprints/vertexWindowsManager');

$(document).ready (function () {
	var out = blueprintLiteral(10, 10, 10);
	graph.addCell(out);
	$(window).on('message', function (e) {
	var data = e.originalEvent.data.split("|");
        var model = graph.findModelsFromPoint( {x: mouseThen[0], y: mouseThen[1]} );
        var out;
		if (data[0] == 'variable') {
			out = blueprintVariable(mouseThen[0], mouseThen[1], data[1], data[2]);
			graph.addCell(out);
		} else if (data[0] == 'loopCond') {
			if (data[1] === 'if') {
				console.log("IF");
				out = blueprintIf(mouseThen[0], mouseThen[1]);
				graph.addCell(out);
			} else if (data[1] === 'while') {
				out = blueprintWhile(mouseThen[0], mouseThen[1]);
				graph.addCell(out);
			} else if (data[1] === 'for') {
				out = blueprintFor(mouseThen[0], mouseThen[1]);
				graph.addCell(out);
			}
		} else if (data[0] == 'literal') {
			if (data[1]) {
				var out = blueprintLiteral(mouseThen[0], mouseThen[1], data[1]);
				graph.addCell(out);
			}
		} else if (data[0] == 'function') {
			
		}
        if (model.length != 0) { model[0].embed(out) };
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
			case 'literal':
				var lit_win = window.open(popups.lit);
				break;

			case 'addition':
				var out = blueprintPlus(mouseThen[0], mouseThen[1]);
				graph.addCell(out);
				break;
			case 'print':
				var out = blueprintPrint(mouseThen[0], mouseThen[1]);
				graph.addCell(out);
				break;
			case 'range':
				var out = blueprintRange(mouseThen[0], mouseThen[1]);
				graph.addCell(out);
				break;
		}
		if (model.length != 0) { model[0].embed(out) };
	});
});

function createVariable () {

}
