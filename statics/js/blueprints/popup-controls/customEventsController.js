var emitter = function (win, params) {
	$(win).emit('send-vInfo', params);
};

exports.emitter = emitter;
