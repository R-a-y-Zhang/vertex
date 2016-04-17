// in charge of modifying the blueprint, i.e. resizing, adding/removing nodes, etc.
var graph = new joint.dia.Graph;
var paper;
$(document).ready(function () {
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
    graph.on('change:position', function(cell, newPosition, opt) {

            if (opt.skipParentHandler) return;

            if (cell.get('embeds') && cell.get('embeds').length) {
                // If we're manipulating a parent element, let's store
                // it's original position to a special property so that
                // we can shrink the parent element back while manipulating
                // its children.
                cell.set('originalPosition', cell.get('position'));
            }
            
            var parentId = cell.get('parent');
            if (!parentId) return;

            var parent = graph.getCell(parentId);
            var parentBbox = parent.getBBox();

            if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
            if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));
            
            var originalPosition = parent.get('originalPosition');
            var originalSize = parent.get('originalSize');
            
            var newX = originalPosition.x;
            var newY = originalPosition.y;
            var newCornerX = originalPosition.x + originalSize.width;
            var newCornerY = originalPosition.y + originalSize.height;
            
            _.each(parent.getEmbeddedCells(), function(child) {

                var childBbox = child.getBBox();
                
                if (childBbox.x < newX) { newX = childBbox.x; }
                if (childBbox.y < newY) { newY = childBbox.y; }
                if (childBbox.corner().x > newCornerX) { newCornerX = childBbox.corner().x; }
                if (childBbox.corner().y > newCornerY) { newCornerY = childBbox.corner().y; }
            });

            // Note that we also pass a flag so that we know we shouldn't adjust the
            // `originalPosition` and `originalSize` in our handlers as a reaction
            // on the following `set()` call.
            parent.set({
                position: { x: newX, y: newY },
                size: { width: newCornerX - newX, height: newCornerY - newY }
            }, { skipParentHandler: true });
    });
});

$(document).ready(function () {
	$(window).resize(function () {
		paper.width = $('#blueprint').width();
		paper.height = $('#blueprint').height();
	});
});
