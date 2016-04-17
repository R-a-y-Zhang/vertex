function createVar (data) {
	var varCell = new joint.shapes.devs.Code({
		position: {
			x: 50, y: 50
		},
		size: {
			width: 200, height: 50
		},
		attrs: {
			text: {
				text: data[0],
				'font-size': 15,
				'font-weight': 'lighter',
				'font-variant': 'small-caps'
			}
		}
	});

	graph.addCell(varCell);
}
