var popups = require('./../statics/js/blueprints/vertexWindowsManager');

var runtest = function () {
	console.log('test');
};

var mousePos = [0,0];

$(document).ready (function () {
	$(this).mousemove(function (e) {
		mousePos[0] = e.pageX;
		mousePos[1] = e.pageY;
	});

	$('#blueprint').on('click', '.insertNodeMenu-item', function () {
		var attrId = $(this).attr('id');
		switch(attrId) {
			case 'variable':
				var data = popups.var_html;
				console.log(data);
				$('#blueprint').append(data);
				$('#popup-window-div-body').css({
					width: '400px',
					height: '200px',
					left: $('#blueprint').width() / 2 - 200,
					top: $('#blueprint').height() / 2 - 100,
					position: 'absolute'
				});
				break;
 		}
	});
});

// catches events from vertex popups
