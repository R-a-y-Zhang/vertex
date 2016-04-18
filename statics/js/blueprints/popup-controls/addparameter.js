
$(document).ready(function(){

	var ctr = 2
	var Par = "Par"+ctr
	var Val = "Val"+ctr
	$("#add").click(function (){

		$("#paras").append("<br></br> <input type='text' class='var-input' id=Par" + ctr.toString() + '"' + " placeholder='Par'</input>")
		$("#paras2").append("<br></br> <input type='text' class='var-input' id=Var" + ctr.toString() + '"' + " placeholder='Val'</input>")

		ctr += 1;
		console.log(ctr)
});
});
