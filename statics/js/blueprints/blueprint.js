joint.shapes.devs.Code = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.Model',
        size: { width: 1, height: 1 },
        python: "",
        inPorts: [],
        outPorts: [],
        types: [],
	fstChild: '',
	chld: "child",
	prnt: "parent",
        attrs: {
            '.': { magnet: false },
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
        }

    }, joint.shapes.basic.Generic.prototype.defaults),

    getPortAttrs: function(portName, index, total, selector, type) {

        var attrs = {};

        var portClass = 'port' + index;
        var portSelector = selector + '>.' + portClass;
        var portLabelSelector = portSelector + '>.port-label';
        var portBodySelector = portSelector + '>.port-body';

        attrs[portLabelSelector] = { text: portName };
        attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
        attrs[portSelector] = { ref: '.body', 'ref-y': (index + 0.5) * (1 / total) };
        if (portName === 'procIn') {
            attrs[portSelector] = { ref: '.body', 'ref-y': 0, 'ref-x': 0.5};
            attrs[portLabelSelector] = { name: '' };
        }

        if (selector === '.outPorts') {
            if (portName === 'procOut') {
                attrs[portSelector] = { ref: '.body', 'ref-dy': 0, 'ref-x': 0.5 };
                attrs[portLabelSelector] = { name: '' };
            } else attrs[portSelector]['ref-dx'] = 0;
        }

        return attrs;
    }
}));

//basic adjustments to be made to every codeblock

function blueprintBasic(x, y, python, text, inPorts, outPorts, hasIn = true, hasOut = true) {
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
            '.label': { text: text, 'ref-x': .5, 'ref-y': .5 }
        }
    });
    out.attr('[port="procIn"]/fill', 'black');
    out.attr('[port="procOut"]/fill', 'black');
    console.log(out.get('types'));
    return out;
}

function blueprintVariable(x, y, name, value) {
    return blueprintBasic(x, y, name + ' = {assignment}', name, [{ port: 'assignment', type: 'any' }], [{port: 'value', type: 'any'}]);
}

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

function blueprintFunction(x, y, name, parameters, outputTypes) {
    var python = name + '('
    for (i = 0; i < parameters.length; i++) {
        python += '{' + parameters[i].name + '}'
    }
    python += ')'
    return blueprintBasic(x, y, python, name, parameters, outputTypes.map( function(cv, i, a) { return {port: cv, type: cv} }));
}

function blueprintReturn(x, y, parent) {
    var out = blueprintBasic(x, y, 'return {value}', 'return', [{port: 'value', type: 'any'}], [], true, false);
    parent.embed(out);
    return out;
}

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

function blueprintStart(x, y) {
    return blueprintBasic(x, y, '#start of execution\n', 'START', [], [], false);
}

function blueprintLiteral(x, y, value) {
    return blueprintBasic(x, y, value.toString(), value.toString(), [], [{port: 'value', type: 'any'}], false, false);
}

function blueprintPlus(x, y) {
    return blueprintBasic(x, y, '{lhs} + {rhs}', 'fn:plus', [{port: 'lhs', type: 'number'}, {port: 'rhs', type: 'number'}], [{type: 'number', port: 'number'}]);
}

function blueprintPrint(x, y) {
    return blueprintBasic(x, y, 'print({input})', 'fn:print', [{port: 'input', type: 'any'}], [])
}
function blueprintRange(x, y) {
    return blueprintBasic(x, y, 'range({start}, {end})', 'fn:range', [{port: 'start', type: 'number'}, {port: 'end', type: 'number'}], [{type: 'range', port: 'range'}]);
}
