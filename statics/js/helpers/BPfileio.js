var fs = require('fs');

function writeJSONOut (text) {
	fs.writeFile('output.json', text, function (err) {
		return console.log(err);
	});
}

exports.writeJSONOut = writeJSONOut;
