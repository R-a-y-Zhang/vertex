var path = require('path');
var fs = require('fs');
var gui = window.require('nw.gui');

var HTMLS_PG = '~/Documents/vertex/htmls/node-creation-windows/';

var var_html = "<div id='popup-window-div-body'> \
	<div id='header'> \
		Create variable \
	</div> \
	<div id='popup-content'> \
		<div id='fields'> \
			<div id='var-name' class='popup-fields-container'> \
				<p class='label-text'> Name </p> \
				<input type='text' class='var-input' id='var-name' placeholder='(Required)' tabindex='1'> \
			</div> \
			<div id='initval' class='fields-container'> \
				<p class='label-text'> Initial value </p> \
				<input type='text' class='var-input' id='var-init' placeholder='None' tabindex='2'> \
			</div> \
		</div> \
	</div> \
	<div id='footer'> \
		<div class='btn-div' id='confirm-div'> \
			<p class='state-btn' id='confirm' tabindex='3'> Confirm </p> \
		</div> \
	</div> \
</div>"
exports.var_html = var_html;
