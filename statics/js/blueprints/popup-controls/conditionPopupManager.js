$(document).ready(function () {
	window.resizeTo(400, 200);

	$('#confirm-div').click(function () {
		var type = $('#condition-select').val();
		if (type != 'none') {
			var data = 'loopCond|' + type;
			console.log(data);
			window.opener.postMessage(data, '*');
			window.close();
		}
	});
});
