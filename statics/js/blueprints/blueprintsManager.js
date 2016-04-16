// in charge of modifying the blueprint, i.e. resizing, adding/removing nodes, etc.
var graph = new joint.dia.Graph;
var paper;
$(document).ready(function () {

	// setting up paper and graph
	paper = new joint.dia.Paper({
		el: $('#blueprint'),
		width: $('#blueprint').width(),
		height: $('#blueprint').height(),
		model: graph,
		gridSize: 1
	});
});

$(document).ready(function () {
	$(window).resize(function () {
		paper.width = $('#blueprint').width();
		paper.height = $('#blueprint').height();
	});
});
