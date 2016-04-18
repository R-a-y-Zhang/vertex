/* Contains all the information a vertex will ever need...ever */
'use strict'

class vertex {
	/********
	params
		type: type of vertex (for-loop, function, etc.)
		name: name given to vertex (defaults to undefined)
	********/

	constructor(type, name) {
		this.type = type;
		this.name = name;
		this.hierarchy = []; // empty hierarchy means it is global
		this.inbounds = []; // connections in which this is the start point
		this.outbounds = []; // connections in which this is the end point
		this.children = []; // all children
	}
}

exports.vertex = vertex;
