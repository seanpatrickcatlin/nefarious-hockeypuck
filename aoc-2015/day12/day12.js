var fs = require('fs');

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var sumOfNumbers = function(val) {
    var sum = 0;

    for(var key in val) {
        var sub = val[key];


        if((typeof val === 'object') && !Array.isArray(val) && (sub === 'red')) {
            return 0;
        }

        if ((typeof sub === 'object')) {
            sum += sumOfNumbers(sub);
        } else {
            var num = parseInt(sub, 10);

            if(isNaN(num)) {
                //console.log('ignoring: ' + sub);
            } else {
                sum += num;
            }
        }
    }

    return sum;
}


var filename = process.argv[2];

var onReadFileComplete = function(error, data) {
    var base = data.trim();

    var lines = base.split('\n');

    var jsonObj = JSON.parse(lines[0]);

    console.log(sumOfNumbers(jsonObj));
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
