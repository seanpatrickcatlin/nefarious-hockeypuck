var fs = require('fs');

// '(' open parenthesis mean to go up one floor
// ')' close parenthesis mean to go down one floor

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var filename = process.argv[2];

var onReadFileComplete = function(error, data) {
    var charArray = data.split('');

    var floor = 0;
    var firstBasementPosition;

    charArray.forEach(function(value, index) {
        if(value === '(') {
            floor++;
        } else if(value === ')') {
            floor--;
        } else {
            console.log('Unknown character: ' + value);
        }

        if((floor === -1) && (firstBasementPosition === undefined)) {
            firstBasementPosition = index+1;
        }
    });

    console.log('Floor: ' + floor);
    console.log('firstBasementPosition: ' + firstBasementPosition);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
