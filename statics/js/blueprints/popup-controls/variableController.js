$(document).ready(function () {
	window.resizeTo(400, 200);
	$('#confirm-div').click(function () {
		window.close();
	});

	/* $(window).blur(function () {
		console.log("blurred");
	}); */

	$(window).beforeunload(function () {
		params = { name: $('#var-name').val(), initVal: $('#var-init').val() };
	});
});
