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

    var instructions = data.split('\n');

    var lights = [];

    // preallocate array
    for(var i=0; i<1000; i++) {
        lights[i] = [];
        for(var j=0; j<1000; j++) {
            lights[i][j] = 0;
        }
    }

    // note i modified this for the second solution
    instructions.forEach(function(value) {
        var details = value.split(' ');
        if(details.length < 3) {
            return;
        }
        console.log('instruction: ' + value);
        var newState;

        var firstCoord;
        var secondCoord;

        if(details[0] === 'turn') {
            newState = (details[1] === 'on');
            firstCoord = details[2];
            secondCoord = details[4];
            console.log('newState: ' + newState);
        } else {
            firstCoord = details[1];
            secondCoord = details[3]
            console.log('toggling');
        }

        var firstCoordArray = firstCoord.split(',');
        var secondCoordArray = secondCoord.split(',');

        var firstX = parseInt(firstCoordArray[0], 10);
        var firstY = parseInt(firstCoordArray[1], 10);
        var secondX = parseInt(secondCoordArray[0], 10);
        var secondY = parseInt(secondCoordArray[1], 10);

        console.log('FirstX: ' + firstX +
                    'FirstY: ' + firstY +
                    'secondX: ' + secondX +
                    'secondY: ' + secondY);

        for(var x=firstX; x<=secondX; x++) {
            for(var y=firstY; y<=secondY; y++) {
                if(newState !== undefined) {
                    if(newState) {
                        lights[x][y]++;
                    } else if(lights[x][y] > 0) {
                        lights[x][y]--
                    }
                } else {
                    lights[x][y] += 2;
                }
            }
        }
    });

    var brightness = 0;

    for(var i=0; i<1000; i++) {
        for(var j=0; j<1000; j++) {
            brightness += lights[i][j];
        }
    }

    console.log('brightness: ' + brightness);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
