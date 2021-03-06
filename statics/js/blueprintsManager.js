
function setNewPaper(element, w, h) {
	var graph = new joint.dia.Graph;
	var paper = new joint.dia.Paper({
		el: $(element),
		width: w,
		height: h,
		model: graph,
		gridSize: 1
	});

	var rect = new joint.shapes.basic.Rect({
		position: { x: 100, y: 30 },
		size: { width: 100, height: 30 },
		attrs: { rect: { fill: 'blue' }, text: { text: 'hello!', fill: 'white' }}});

	graph.addCells([rect]);
}

exports.graph = graph;
