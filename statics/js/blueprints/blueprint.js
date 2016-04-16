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
                r: 8,
                magnet: true,
                stroke: '#000000'
            },
            '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
            '.outPorts circle': { fill: '#E74C3C', type: 'output' },
            rect: { fill: '#ffffff', rx: 20, ry: 48 },
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
function basicAdjustments(codeblock) {
    codeblock.attr('[port="procIn"]/fill', 'black');
    codeblock.attr('[port="procOut"]/fill', 'black');
}

function blueprintVariable(x, y, name, value) {
    return new joint.shapes.devs.Code({
        position: { x: x, y: y },
        size: { width: 300, height: 50 },
        inPorts: ['procIn', 'assignment'],
        outPorts: ['procOut', 'usage'],
        attrs: {
            '.label': { text: name, 'ref-x': .5, 'ref-y': .5 }
        }
    });
}
