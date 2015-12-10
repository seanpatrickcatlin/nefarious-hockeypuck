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

    var table = {};

    lines.forEach(function(line) {
        var lineArray = line.split(' ');

        var source = lineArray[0];
        var dest = lineArray[2];
        var distance = parseInt(lineArray[4], 10);

        if(table[source] === undefined) {
            table[source] = {};
        }

        table[source][dest] = distance;

        if(table[dest] === undefined) {
            table[dest] = {};
        }

        table[dest][source] = distance;
    });

    var cities = Object.keys(table);

    // from http://stackoverflow.com/questions/9960908/permutations-in-javascript
    var results = [];

    function permute(arr, memo) {
      var cur, memo = memo || [];

      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }

      return results;
    }
    // end SO code

    var paths = permute(cities);

    var shortestPath = -1;
    var longestPath = -1;

    paths.forEach(function(path) {
        var thisDistance = 0;

        for(var i=0; i<(path.length-1); i++) {
            thisDistance += table[path[i]][path[i+1]];
        }

        if((shortestPath === -1) || (thisDistance < shortestPath)) {
            shortestPath = thisDistance;
        }

        if((longestPath === -1) || (thisDistance > longestPath)) {
            longestPath = thisDistance;
        }
    });

    console.log("shortestPath: " + shortestPath);
    console.log("longestPath: " + longestPath);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
