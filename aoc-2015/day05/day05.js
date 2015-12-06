var fs = require('fs');
var crypto = require('crypto');

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var filename = process.argv[2];

var isNaughty = function(input) {
    if((input.indexOf('ab') !== -1) ||
        (input.indexOf('cd') !== -1) ||
        (input.indexOf('pq') !== -1) ||
        (input.indexOf('xy') !== -1)) {
        return true;
    }

    var vowelCount = 0;
    var hasDouble;
    var lastChar;

    var charArray = input.split('');

    charArray.forEach(function(value) {
        if((hasDouble === undefined) && (value === lastChar)) {
            hasDouble = true;
        }

        if((value === 'a') ||
            (value === 'e') ||
            (value === 'i') ||
            (value === 'o') ||
            (value === 'u')) {
            vowelCount++;
        }

        lastChar = value;
    });

    return !(hasDouble && (vowelCount >= 3));
};

var isNicePartTwo = function(input) {
    var lastChar;
    var lastLastChar;

    var hasRepeatedSingleLetter;
    var hasRepeatedTuple;

    var charArray = input.split('');

    charArray.forEach(function(value, index) {
        if((hasRepeatedSingleLetter === undefined) &&
            (value === lastLastChar)) {
            hasRepeatedSingleLetter = true;
        }

        if((lastChar !== undefined) && (hasRepeatedTuple === undefined)) {
            var thisTuple = (lastChar + value);
            console.log('checking tuple: ' + thisTuple);

            if(input.indexOf(thisTuple, index+1) !== -1) {
                hasRepeatedTuple = true;
            }
        }

        lastLastChar = lastChar;
        lastChar = value;
    });

    return (hasRepeatedSingleLetter && hasRepeatedTuple);
};

var onReadFileComplete = function(error, data) {
    var base = data.trim();

    var niceCount = 0;
    var naughtyCount = 0;

    var inputStrings = base.split('\n');

    inputStrings.forEach(function(value) {
        /*
        // Part 1
        if(isNaughty(value)) {
            naughtyCount++;
        } else {
            niceCount++;
        }
        */

        // Part 2
        if(isNicePartTwo(value)) {
            niceCount++;
        } else {
            naughtyCount++;
        }
    });

    console.log('niceCount: ' + niceCount);
    console.log('naughtyCount: ' + naughtyCount);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
