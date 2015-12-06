var fs = require('fs');

// input contains lines with dimension WxLxH
// need total area of cube plus area of the smallest side

// http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js
if(process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' <filename>');
    return;
}

var filename = process.argv[2];

var onReadFileComplete = function(error, data) {
    var dimensions = data.split('\n');

    var totalArea = 0;
    var totalRibbonLength = 0;

    dimensions.forEach(function(value) {
        var thisSample = value.split('x');

        if(thisSample.length !== 3) {
            console.log('line is not valid: ' + value);
            return;
        }

        var wid = parseInt(thisSample[0], 10);
        var hei = parseInt(thisSample[1], 10);
        var len = parseInt(thisSample[2], 10);

        if((wid === NaN) || (hei === NaN) || (len === NaN)) {
            console.log('line does not contain numberrs: ' + value);
        }

        var sideOneArea = wid*hei;
        var sideTwoArea = wid*len;
        var sideThreeArea = len*hei;

        var sideOnePerimeter = ((wid*2)+(hei*2));
        var sideTwoPerimeter = ((wid*2)+(len*2));
        var sideThreePerimeter = ((len*2)+(hei*2));

        var volume = (wid*hei*len);

        var smallestSide = sideOneArea;
        var ribbonLength = sideOnePerimeter;

        if(sideTwoArea < smallestSide) {
            smallestSide = sideTwoArea;
            ribbonLength = sideTwoPerimeter;
        }

        if(sideThreeArea < smallestSide) {
            smallestSide = sideThreeArea;
            ribbonLength = sideThreePerimeter;
        }

        totalArea += ((sideOneArea*2) + (sideTwoArea*2) + (sideThreeArea*2) + smallestSide);
        totalRibbonLength += (ribbonLength + volume);
    });

    console.log('totalArea: ' + totalArea);
    console.log('totalRibbonLength: ' + totalRibbonLength);
};

fs.readFile(filename, 'utf-8', onReadFileComplete);
