var popups = require('./../statics/js/blueprints/vertexWindowsManager');

var runtest = function () {
	console.log('test');
};

$(document).ready (function () {
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
					position: 'absolute'
				});
				break;
 		}
	});
});

// catches events from vertex popups
