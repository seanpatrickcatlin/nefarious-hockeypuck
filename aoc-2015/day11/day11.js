var getCharCode = function(char) {
    return char.charCodeAt(0);
}

var zCharCode = getCharCode('z');

var passwordIsValid = function(password) {
    if((password.indexOf('i') !== -1) ||
        (password.indexOf('o') !== -1) ||
        (password.indexOf('l') !== -1)) {
        return false;
    }

    var passwordChars = password.split('');

    var hasThreeConsecutive = false;

    for(var i=0; (i<password.length-2) && (!hasThreeConsecutive); i++) {
        var charCodeOne = getCharCode(password[i]);
        var charCodeTwo = getCharCode(password[i+1]);
        var charCodeThree = getCharCode(password[i+2]);

        hasThreeConsecutive =(
            ((charCodeOne+1) == charCodeTwo) &&
            ((charCodeTwo+1) == charCodeThree) &&
            (charCodeThree <= zCharCode)
        );
    }

    if(!hasThreeConsecutive) {
        return false;
    }

    var doubleCount = 0;
    var lastDoubleChar = '';

    for(var i=0; (i<password.length-1) && (doubleCount < 2); i++) {
        if((password[i] === password[i+1]) && (password[i] != lastDoubleChar)) {
            lastDoubleChar = password[i];
            doubleCount++;
            i++;
        }
    }

    return (doubleCount >= 2);
};

var getNextPassword = function(currentPassword) {
    var pwArray = currentPassword.split('');

    var lastIndex = pwArray.length-1;
    var lastCharCode = getCharCode(pwArray[lastIndex]);
    var nextCharCode = (lastCharCode+1);

    if(nextCharCode <= zCharCode) {
        pwArray[lastIndex] = String.fromCharCode(nextCharCode);

        return pwArray.join('');
    }

    var basePassword = currentPassword.substring(0, lastIndex);
    var nextBase = getNextPassword(basePassword);

    return nextBase + 'a';
}

var solve = function(str) {
    var solution = str;

    var i=0;

    solution = getNextPassword(solution);

    while(!passwordIsValid(solution)) {
        solution = getNextPassword(solution);
        i++;
    }

    return solution;
}

var part1 = solve('hepxcrrq');
console.log("Part 1: " + part1);
console.log("Part 2: " + solve(part1));
