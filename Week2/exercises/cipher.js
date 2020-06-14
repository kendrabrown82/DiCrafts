
//Write a function cipher which is given a string, an offset, and returns the Caesar cipher of the string.
function cipher(aString, offset) {
    //use an array to push all the converted characters
    let bArr = [];

    //starting with uppercase characters (65 - 90) and then lowercase (97-122)
    //the algorithm for uppercase characters is (character code - offset + 65) % 26 + 65
    //the algorithm for lowercase characters is the same but '97' instead of '65'
        
    for (let i = 0; i < aString.length; i++) {
        if (aString.charCodeAt(i) >= 65 && aString.charCodeAt(i) <= 90) {
            bArr.push((aString.charCodeAt(i) - 65 + offset) % 26 + 65);
        } else if (aString.charCodeAt(i) >= 97 && aString.charCodeAt(i) <= 122) {
            bArr.push((aString.charCodeAt(i) - 97 + offset) % 26 + 97);
        } else {
            bArr.push(aString.charCodeAt(i));
        }
    
    }
    //probably a better way to do this but I took the items from the array and turned it into a string using a loop
    //while converting into a string, converted the numbers/codes back into letters
    
    let aStr = ""
    for(let i = 0; i < bArr.length; i++) {
        aStr += String.fromCharCode(bArr[i]);
    }

    return aStr;
}

console.log(cipher("Genius without education is like silver in the mine", 16));
