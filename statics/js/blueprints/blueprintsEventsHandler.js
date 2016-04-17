var menus = require('./../statics/js/blueprints/menusManager');

var menuUp = false;
var menuStack = [];

var ks = [];

var mousePos = [0, 0];
var mouseThen = [0,0];

$(document).ready(function () {
	// initializing variables
	$(document).mousemove(function (e) {
		mousePos[0] = e.pageX;
		mousePos[1] = e.pageY;
	});

	// shortcuts
	$(document).keyup(function (e) {
		ks = [];
	});

	$(document).keydown(function (e) {
		e.preventDefault();
		if (ks.indexOf(e.which) == -1) {
			ks.push(e.which);
		}

		/*  handle shortcuts here (refer to docs).
			shortcuts list
			Shift - 16
			Ctrl - 17
			Alt - 18
			Tab - 9
			Space - 32
			A - 65; F - 70; K - 75; P - 80; U - 85; Z - 90 */

		if (ks[0] == 17 && ks[1] != undefined) {
			switch(ks[1]) { // Ctrl
				case 65: // A
                    mouseThen[0] = mousePos[0] - $('#blueprint').offset().left;
                    mouseThen[1] = mousePos[1] - $('#blueprint').offset().top;
                    if (mouseThen[0] < 0 || mouseThen[0] > $('#blueprint').width()) {
                        mouseThen[0] = 30;
                        mouseThen[1] = 30;
                    }
                    if (mouseThen[1] < 0 || mouseThen[1] > $('#blueprint').width()) {
                        mouseThen[1] = 30;
                        mouseThen[1] = 30;
                    }
					openInsertNodeMenu();
					break;
				case 70: // F

				case 16: // Shift
					if (ks[2] == 70) {
					
					} // F

				case 69: // E

				case 81: // Q

				case 87: // W

				case 77: // M
			}
		}
	});
    graph.on('all', function(eventName, cell) {
        console.log(arguments);
    });

	$(document).click(function (e) {
		$(this).attr('id');
		if (menuUp) {
			$('#nodeMenu').remove();
			menuUp = false;
		}
	});
});

function openInsertNodeMenu () {
	menu = menus.nodeMenu;
	if (menuUp) {
		$('#nodeMenu').remove();
	}

	$('#blueprint').append(menus.nodeMenu);
	$('#nodeMenu').css({
		position: 'absolute',
		top: mousePos[1],
		left: mousePos[0]
	});

	menuUp = true;
}
