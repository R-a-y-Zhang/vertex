$(document).ready(function () {

	window.resizeTo(400, 200);
	$('#confirm-div').click(function () {
		$(window).trigger('test');
	});
});
