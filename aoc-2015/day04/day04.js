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
    var answer;
    var answerTwo;
    var count;

    for(count=1; ((answer === undefined) || (answerTwo === undefined)); count++) {
        var testString = base + count.toString();
        var hash = crypto.createHash('md5').update(testString).digest("hex");

        if((hash[0] === '0') &&
            (hash[1] === '0') &&
            (hash[2] === '0') &&
            (hash[3] === '0') &&
            (hash[4] === '0')) {
            if(answer === undefined) {
                answer = count;
                console.log("found answerOne: " + answer);
            }

            if(hash[5] === '0') {
                answerTwo = count;
            }
        }
    }

    console.log('answer: ' + answer);
    console.log('answerTwo: ' + answerTwo);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
