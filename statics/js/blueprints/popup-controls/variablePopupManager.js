$(document).ready(function () {
	window.resizeTo(400, 200);

	$('.btn-div').click(function () {
		var varName = $('#var-name').val();
		var varInit = $('#var-init').val();
		if (varInit == '') varInit = "None";
		var data = "variable|" + varName + '|' + varInit;
		window.opener.postMessage(data, "*");
		window.close();
	});
});
