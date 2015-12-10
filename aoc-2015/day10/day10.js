var fs = require('fs');

if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' input');
    return;
}

var consoleInput = process.argv[2];

var lookAndSee = function(input) {
    var chars = input.split('');

    var output = '';

    var currentChar = '';
    var currentCharCount = 0;

    chars.forEach(function(char, index) {
        if(currentChar === '') {
            currentChar = char;
            currentCharCount = 1;
        } else if(currentChar === char) {
            currentCharCount++;
        } else {
            output += currentCharCount.toString();
            output += currentChar;

            currentCharCount = 1;
            currentChar = char;
        }

        if(index === (chars.length-1)) {
            output += currentCharCount.toString();
            output += currentChar;
        }
    });


    return output;
}

var fortyAnswer = consoleInput;

for(var i=0; i<50; i++) {
    fortyAnswer = lookAndSee(fortyAnswer);
}

console.log('part1: ' + fortyAnswer.length);
