// in charge of modifying the blueprint, i.e. resizing, adding/removing nodes, etc.
var graph = new joint.dia.Graph;
var paper;
$(document).ready(function () {
	graph = new joint.dia.Graph;
	paper = new joint.dia.Paper({
		el: $('#blueprint'),
		width: $('#blueprint').width(),
		height: $('#blueprint').height(),
		gridSize: 1,
		model: graph,
		defaultLink: new joint.dia.Link({
			attrs: { 
				'.marker-target': { fill: '#ffffff', stroke: '#ffffff', d: 'M 10 0 L 0 5 L 10 10 z' }, 
				'.connection': { stroke: '#ffffff' }
			}
		}),
		defaultRouter: { name: 'manhattan' },
		defaultConnector: { name: 'rounded' },
		perpendicularLinks: true,
		linkPinning: false,
		validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
			// Prevent linking from input ports.
			if (magnetS && magnetS.getAttribute('type') === 'input') return false;
			// Prevent linking from output ports to input ports within one element.
			if (cellViewS === cellViewT) return false;
			// Prevent linking to input ports.
			return magnetT && magnetT.getAttribute('type') === 'input';
		},
		validateMagnet: function(cellView, magnet) {
			// Note that this is the default behaviour. Just showing it here for reference.
			// Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
			return magnet.getAttribute('magnet') !== 'passive';
		}
	});
});
