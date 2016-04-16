$(document).ready(function () {
	window.resizeTo(400, 200);
	$('#confirm-div').click(function () {
		window.close();
	});

	/* $(window).blur(function () {
		console.log("blurred");
	}); */

	$(window).on('beforeunload', function () {
		console.log("trigger");
		$(this).trigger('test');
		params = { type: 'var', name: $('#var-name').val(), initVal: $('#var-init').val() };
	});
});
