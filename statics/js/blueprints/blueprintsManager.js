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
