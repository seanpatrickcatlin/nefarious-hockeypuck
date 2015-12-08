var fs = require('fs');

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var filename = process.argv[2];

var onReadFileComplete = function(error, data) {
    var base = data.trim();

    var lines = base.split('\n');

    var totalCharacterCount = 0;
    var parsedCharacterCount = 0;
    var encodedCharacterCount = 0;

    lines.forEach(function(line) {
        totalCharacterCount += line.length;
        encodedCharacterCount += line.length;
        encodedCharacterCount += 4;

        if(line.length === 2) {
            return;
        }

        var parsedString = line.substring(1, line.length-1);

        var slashEscapeIndex = parsedString.indexOf('\\\\');

        while(slashEscapeIndex !== -1) {
            var beginning = parsedString.substring(0, slashEscapeIndex);
            var ending = parsedString.substring(slashEscapeIndex+2);
            parsedString = beginning + '&' + ending;
            slashEscapeIndex = parsedString.indexOf('\\\\');
            encodedCharacterCount += 2;
        }

        var parsedStringArray = parsedString.split('\\"');

        parsedString = parsedStringArray.reduce(function(prev, cur, index) {
            if(index === 0) {
                return cur;
            }

            encodedCharacterCount += 2;

            return prev+cur+'&';
        });

        parsedStringArray = parsedString.split('\\x');

        parsedString = parsedStringArray.reduce(function(prev, cur, index) {
            if(index === 0) {
                return cur;
            }

            var possibleHexVal = cur.substring(0, 2);

            if(isNaN(parseInt(possibleHexVal, 16))) {
                return prev+cur;
            }

            encodedCharacterCount ++;

            var newVal = cur.substring(2);

            return prev+'&'+newVal;
        }, '');

        parsedCharacterCount += parsedString.length;
    });

    console.log('Total: ' + totalCharacterCount);
    console.log('Parsed: ' + parsedCharacterCount);
    console.log('Encoded: ' + encodedCharacterCount);
    console.log('Part1: ' + (totalCharacterCount-parsedCharacterCount));
    console.log('Part2: ' + (encodedCharacterCount-totalCharacterCount));
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
