var fs = require('fs');
var crypto = require('crypto');

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var filename = process.argv[2];

var onReadFileComplete = function(error, data) {
    var base = data.trim();

    var instructions = base.split('\n');

    var signals = {};

    var getValueOfWire = function(wireName) {
        if(signals[wireName] !== undefined) {
            return signals[wireName];
        }

        instructions.forEach(function(value, index) {
            var operands = value.split(' ');
            var targetKey = operands[operands.length - 1];

            if(targetKey !== wireName) {
                return;
            }

            // we now have the operands required to get the wire value
            var assignmentIndex = operands.indexOf('->');

            var valOne;
            var valTwo;

            if(assignmentIndex === 1) {
                valOne = parseInt(operands[0], 10);

                if(isNaN(valOne)) {
                    valOne = getValueOfWire(operands[0]);
                }

                signals[targetKey] = valOne;
                return;
            }

            if(operands[0] === 'NOT') {
                valOne = parseInt(operands[1], 10);

                if(isNaN(valOne)) {
                    valOne = getValueOfWire(operands[1]);
                }

                signals[targetKey] = ~valOne;
                return;
            }

            valOne = parseInt(operands[0], 10);

            if(isNaN(valOne)) {
                valOne = getValueOfWire(operands[0]);
            }

            valTwo = parseInt(operands[2], 10);

            if(isNaN(valTwo)) {
                valTwo = getValueOfWire(operands[2]);
            }

            var command = operands[1];

            if(command === 'LSHIFT') {
                signals[targetKey] = valOne << valTwo;
                return;
            }

            if(command === 'RSHIFT') {
                signals[targetKey] = valOne >> valTwo;
                return;
            }

            if(command === 'AND') {
                signals[targetKey] = valOne & valTwo;
                return;
            }

            if(command === 'OR') {
                signals[targetKey] = valOne | valTwo;
                return;
            }
        });

        return signals[wireName];
    };

    var wire_a_value = getValueOfWire('a');
    console.log('PART 1');
    console.log('Wire \'a\' is: ' + wire_a_value);

    console.log('PART 2');
    signals = {};
    signals['b'] = wire_a_value;

    var part_two_wire_a_value = getValueOfWire('a');
    console.log('Wire \'a\' is: ' + part_two_wire_a_value);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
