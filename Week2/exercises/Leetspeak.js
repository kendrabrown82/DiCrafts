// Write a function leetspeak which is given a string, and returns the leetspeak equivalent of the string. To convert text to its leetspeak version, make the following substitutions:

const leet = function(word) {
    const alphabets = {
        a: "4",
        b: "8",
        e: "3",
        g: "6",
        i: "1",
        o: "0",
        p: "9",
        s: "5",
        t: "7",
        z: "2"
      };

    // initialize array outside of the loop and logic
    let arr = [];
    for (let char of word) {
    //if the character of the word is a key in the alphabets object, push the value  of keyto array, otherwise push character
        if(alphabets.hasOwnProperty(char)) {
            arr.push(alphabets[char]);
        } else {
            arr.push(char)
        }
        
    }
    //return the array converted back into a string
    return arr.join('');   

}

console.log(leet("batterhacker"));