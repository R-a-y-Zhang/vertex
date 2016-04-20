//definition of the basic code block object
joint.shapes.devs.Code = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

    //defines the visuals via svg markup
    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

    //defines the defult attributes for a basic code block object
    defaults: joint.util.deepSupplement({
        type: 'devs.Model',
        size: { width: 1, height: 1 },
        inPorts: [],
        outPorts: [],
        //defines most of the visuals of the block
        attrs: {
            '.': { magnet: false }, //stops links from linking to the body of the block itself
            '.body': {
                width: 150, height: 250,
                stroke: '#000000'
            },
            '.port-body': {
                r: 6,
                magnet: true,
                stroke: '#000000'
            },
            '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
            '.outPorts circle': { fill: '#E74C3C', type: 'output' },
            rect: { fill: '#ffffff', width: 100, height: 30, rx: 20, ry: 20 },
            text: {
                'pointer-events': 'none'
            },
            '.label': { text: 'Model', 'ref-x': .5, 'ref-y': 10, ref: '.body', 'text-anchor': 'middle', fill: '#000000' },
            '.inPorts .port-label': { x:-15, dy: 4, 'text-anchor': 'end', fill: '#000000' },
            '.outPorts .port-label':{ x: 15, dy: 4, fill: '#000000' }
        },
        //start of custom attributes
        python: "", //string to be formatted into python code
        types: [], //array mapping ports to types
        fstChild: '' //first child (embedded block) in the block

    }, joint.shapes.basic.Generic.prototype.defaults),

    //function required for the PortsModelInterface, which is what lets us have a dynamic # of ports
    getPortAttrs: function(portName, index, total, selector, type) {
        var attrs = {};

        var portClass = 'port' + index;
        var portSelector = selector + '>.' + portClass;
        var portLabelSelector = portSelector + '>.port-label';
        var portBodySelector = portSelector + '>.port-body';

        attrs[portLabelSelector] = { text: portName };
        attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
        attrs[portSelector] = { ref: '.body', 'ref-y': (index + 0.5) * (1 / total) };
        //moving the in port to the top
        if (portName === 'procIn') {
            attrs[portSelector] = { ref: '.body', 'ref-y': 0, 'ref-x': 0.5};
            attrs[portLabelSelector] = { name: '' };
        }

        if (selector === '.outPorts') {
            //moving the out port to the bottom
            if (portName === 'procOut') {
                attrs[portSelector] = { ref: '.body', 'ref-dy': 0, 'ref-x': 0.5 };
                attrs[portLabelSelector] = { name: '' };
            } else attrs[portSelector]['ref-dx'] = 0;
        }

        return attrs;
    }
}));

//basic adjustments to be made to every codeblock
//use this as a base to make new types of code blocks
//x: x-coordinate of block
//y: y-coordinate of block
//python: string to be parsed into the python code. include the value of ports with '{portName}' 
//label: string to be displayed on the block
//inPorts: array of { port: string, type: string } denoting input ports. do NOT include procIn
//outPorts: array of { port: string, type: string } denoting output ports. do NOT include procOut
//hasIn: whether or not the block has a procIn. default true
//hasOut: whether or not the block has a procOut. default true
function blueprintBasic(x, y, python, label, inPorts, outPorts, hasIn = true, hasOut = true) {
    if (hasIn) {
        inPorts.push( { port: 'procIn', type: 'proc' } );
    }
    if (hasOut) { 
        outPorts.push( { port: 'procOut', type: 'proc' } );
    }
    var types = inPorts.concat(outPorts);
    var out = new joint.shapes.devs.Code({
        position: { x: x, y: y },
        size: { width: 100, height: 30 },
        python: python,
        inPorts: inPorts.map( function(cv, i, a) { return cv.port } ),
        outPorts: outPorts.map( function(cv, i, a) { return cv.port } ),
        types: types,
        attrs: {
            '.label': { text: label, 'ref-x': .5, 'ref-y': .5 }
        }
    });
    //the following two lines color the procederal in and out ports black
    out.attr('[port="procIn"]/fill', 'black');
    out.attr('[port="procOut"]/fill', 'black');
    return out;
}
//returns a new variable block
//x: x-coordinate
//y: y-coordinate
//name: name of variable
//value: starting value for variable. Optional, and currently not implemented
function blueprintVariable(x, y, name, value) {
    return blueprintBasic(x, y, name + ' = {assignment}', name, [{ port: 'assignment', type: 'any' }], [{port: 'value', type: 'any'}]);
}

//returns a new if (and else) block, as well as their first children
//x: x-coordinate
//y: y-coordinate
function blueprintIf(x, y) {
    var out = blueprintBasic(x, y, 'if {condition}:', 'if', [{ port: 'condition', type: 'boolean' }], []);
    out.attr('[port="else"]/fill', 'black');
    out.set({
        size: { width: 300, height: 90 }
    });
    var ifStart = blueprintBasic(x+100, y+10, '#start of if', 'start', [], [], false);
    out.embed(ifStart);
    var elseVar = blueprintElse(x, y+90);
    out.set('fstChild', ifStart.get('id'))
    return [out, ifStart, elseVar];
}

//returns a new else block, as well as its first child
//x: x-coordinate
//y: y-coordinate
function blueprintElse(x, y) {
    var out = blueprintBasic(x, y, 'else:', 'else', [], []);
    out.set({
        size: { width: 300, height: 90 }
    });
    var elseStart = blueprintBasic(x+100, y+10, '#start of else', 'start', [], [], false);
    out.embed(elseStart);
    out.set('fstChild', elseStart.get('id'))
    return [out, elseStart];
}

//returns a new while block, as well as its first child
//x: x-coordinate
//y: y-coordinate
function blueprintWhile(x, y) {
    var out = blueprintBasic(x, y, 'while {"condition"}:', 'while', [{port: 'condition', type: 'bool'}], []);
    out.set({
        size: { width: 300, height: 90 }
    });
    var whileStart = blueprintBasic(x+100, y+10, '#start of while loop', 'start', [], [], false);
    out.embed(whileStart);
    out.set('fstChild', whileStart.get('id'));
    return [out, whileStart];
}

//returns a new for block, as well as its first child
//note that unlike if, while, and similar, for's first child is a modified variable (no input) representing i
//x: x-coordinate
//y: y-coordinate
function blueprintFor(x, y) {
    var out = blueprintBasic(x, y, 'for i in {collection}:', 'for', [{port: 'collection', type: 'collection<i>'}], []);
    out.set({
        size: { width: 300, height: 90 }
    });
    var forVar = blueprintBasic(x+100, y+10, 'i', 'i', [], [{port: 'value', type: 'collection<i>'}], false);
    out.embed(forVar);
    out.set('fstChild', forVar.get('id'));
    return [out, forVar];
}

//returns a new function block
//this is for already defined functions- see blueprintFunctionDefinition for function definitions
//x: x-coordinate
//y: y-coordinate
//name: function name
//parameters: array of [{port: string, type: string}] representing parameters
//outputTypes: array of types (strings representing type names, because js) representing possible return
//types of the function
function blueprintFunction(x, y, name, parameters, outputTypes) {
    var python = name + '('
    for (i = 0; i < parameters.length; i++) {
        python += '{' + parameters[i].name + '}'
    }
    python += ')'
    return blueprintBasic(x, y, python, name, parameters, outputTypes.map( function(cv, i, a) { return {port: cv, type: cv} }));
}

//returns a return block
//x: x-coordinate
//y: y-coordinate
//parent: block to embed this in. should, but doesn't, check if the parent is a function definition
function blueprintReturn(x, y, parent) {
    var out = blueprintBasic(x, y, 'return {value}', 'return', [{port: 'value', type: 'any'}], [], true, false);
    parent.embed(out);
    return out;
}

//returns a new function definition block
//x: x-coordinate
//y: y-coordinate
//name: name of the function
//parameters: array of [{port: string, type: string}] representing parameters
function blueprintFunctionDefinition(x, y, name, parameters) {
    var python = name + '('
    for (i = 0; i < parameters.length; i++) {
        python += '{', parameters[i].name + '}'
    }
    python += '):\n'
    var out = blueprintBasic(x, y, python, 'fn:' + name, parameters, []);
    out.set({
        size: { width: 300, height: 90 }
    });
    var funStart = blueprintBasic(x+100, y+10, '#start of function definition', 'start', [], [], false);
    out.set('fstChild', funStart.get('id'));
    out.embed(funStart);
    return [out, funStart];
}

//returns a new START block, to be added automatically, and to be the entry point for execution
//essentially the start of the 'main' function
//x: x-coordinate
//y: y-coordinate
function blueprintStart(x, y) {
    return blueprintBasic(x, y, '#start of execution\n', 'START', [], [], false);
}

//returns a new literal block
//x: x-coordinate
//y: y-coordinate
//value: value of the literal
function blueprintLiteral(x, y, value) {
    return blueprintBasic(x, y, value.toString(), value.toString(), [], [{port: 'value', type: 'any'}], false, false);
}

//start of predefined functions
function blueprintPlus(x, y) {
    return blueprintBasic(x, y, '{lhs} + {rhs}', 'fn:plus', [{port: 'lhs', type: 'number'}, {port: 'rhs', type: 'number'}], [{type: 'number', port: 'number'}]);
}

function blueprintPrint(x, y) {
    return blueprintBasic(x, y, 'print({input})', 'fn:print', [{port: 'input', type: 'any'}], [])
}
function blueprintRange(x, y) {
    return blueprintBasic(x, y, 'range({start}, {end})', 'fn:range', [{port: 'start', type: 'number'}, {port: 'end', type: 'number'}], [{type: 'range', port: 'range'}]);
}
