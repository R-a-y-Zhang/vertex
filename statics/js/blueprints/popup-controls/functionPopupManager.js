$(document).ready(function () {
	window.resizeTo(400, 300);


	$('#confirm').click(function () {
		var allArgs = $('#paras').children();
		for (arg of allArgs) {
			console.log(arg);
		}
	});
});
