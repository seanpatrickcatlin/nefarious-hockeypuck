var fs = require('fs');

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var filename = process.argv[2];

var onReadFileComplete = function(error, data) {
    var charArray = data.split('');

    var visitedHouses = [];

    var xCoord = 0;
    var yCoord = 0;

    visitedHouses.push({
        x: xCoord,
        y: yCoord,
        count: 1
    });

    var visitedHousesYearTwo = [];

    visitedHousesYearTwo.push({
        x: xCoord,
        y: yCoord,
        count: 2
    });

    var santaCoords = {x: 0, y: 0};
    var roboSantaCoords = {x: 0, y: 0};

    charArray.forEach(function(value, index) {
        var yearTwoCoords = santaCoords;

        if((index%2) === 0) {
            yearTwoCoords = roboSantaCoords;
        }

        if(value === '<') {
            xCoord--;
            yearTwoCoords.x--;
        } else if(value === '>') {
            xCoord++;
            yearTwoCoords.x++;
        } else if(value === '^') {
            yCoord++;
            yearTwoCoords.y++;
        } else if(value === 'v') {
            yCoord--;
            yearTwoCoords.y--;
        } else {
            return;
        }

        var existingHouse = visitedHouses.filter(function(value) {
            return ((value.x === xCoord) && (value.y === yCoord));
        })[0];

        if(existingHouse === undefined) {
            visitedHouses.push({
                x: xCoord,
                y: yCoord,
                count: 1
            });
        } else {
            existingHouse.count++;
        }

        var existingHouseYearTwo = visitedHousesYearTwo.filter(function(value) {
            return ((value.x === yearTwoCoords.x) && (value.y === yearTwoCoords.y));
        })[0];

        if(existingHouseYearTwo === undefined) {
            visitedHousesYearTwo.push({
                x: yearTwoCoords.x,
                y: yearTwoCoords.y,
                count: 1
            });
        } else {
            existingHouseYearTwo.count++;
        }
    });

    console.log('visitedHouses.length: ' + visitedHouses.length);
    console.log('visitedHousesYearTwo.length: ' + visitedHousesYearTwo.length);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
