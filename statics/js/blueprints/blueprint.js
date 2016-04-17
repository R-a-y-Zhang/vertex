joint.shapes.devs.Code = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.Model',
        size: { width: 1, height: 1 },

        inPorts: [],
        outPorts: [],

        attrs: {
            '.': { magnet: false },
            '.body': {
                width: 150, height: 250,
                stroke: '#000000'
            },
            '.port-body': {
                r: 4,
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

function blueprintBasic(x, y, text, inPorts, outPorts, hasIn = true, hasOut = true) {
    if (hasIn) inPorts.push('procIn');
    if (hasOut) outPorts.push('procOut');
    var out = new joint.shapes.devs.Code({
        position: { x: x, y: y },
        size: { width: 100, height: 30 },
        inPorts: inPorts,
        outPorts: outPorts,
        attrs: {
            '.label': { text: text, 'ref-x': .5, 'ref-y': .5 }
        }
    });
    out.attr('[port="procIn"]/fill', 'black');
    out.attr('[port="procOut"]/fill', 'black');
    return out;
}

function blueprintVariable(x, y, name, value) {
    return blueprintBasic(x, y, name, ['assignment'], ['value']);
}

function blueprintIf(x, y) {
    var out = blueprintBasic(x, y, 'if', ['condition'], ['true', 'else']);
    out.attr('[port="true"]/fill', 'black');
    out.attr('[port="else"]/fill', 'black');
    return out;
}

function blueprintWhile(x, y) {
    var out = blueprintBasic(x, y, 'while', ['condition'], []);
    out.set({
        size: { width: 300, height: 90 }
    });
    var whileStart = blueprintBasic(x+100, y+10, 'start', [], [], false);
    out.embed(whileStart);
    return [out, whileStart];
}

function blueprintFor(x, y) {
    var out = blueprintBasic(x, y, 'for', ['collection'], []);
    out.set({
        size: { width: 300, height: 90 }
    });
    var forVar = blueprintBasic(x+100, y+10, 'i', [], ['value'], false);
    out.embed(forVar);
    return [out, forVar];
}

function blueprintFunction(x, y, name, parameters, outputTypes) {
    return blueprintBasic(x, y, name, parameters.map(function(param) {param.name}), outputTypes);
}

function blueprintReturn(x, y, parent) {
    var out = blueprintBasic(x, y, 'return', ['value'], [], true, false);
    parent.embed(out);
    return out;
}
