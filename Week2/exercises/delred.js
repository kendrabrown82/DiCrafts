const arr = [2,5,1, 3,6];

const nArr = arr.reduce(function(accum, item) {
    return accum + item;
});


console.log(nArr);