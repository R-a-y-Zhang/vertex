$(document).ready(function () {
	window.resizeTo(400, 200);

	$('#confirm').click(function () {
		var num = $('#literal_val').val();
		if (num) {
			var data = 'literal|' + num;
			window.opener.postMessage(data, '*');
			window.close();
		}
	});
});
