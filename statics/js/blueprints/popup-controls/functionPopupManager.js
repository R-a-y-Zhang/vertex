$(document).ready(function () {
	window.resizeTo(600, 400);

	$('#confirm').click(function () {
		var allArgs = $('#paras').childNodes;
		for (arg of allArgs) {
			console.log(arg);
		}
	});
});
