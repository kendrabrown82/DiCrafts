// Make all of the boxes blue when you click the button
// Notice that all the boxes have "class" instead of "id"

var boxes = document.getElementsByClassName('box');
var myButton = document.getElementById('myButton');

myButton.addEventListener('click', function() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.background = 'blue';
    }
});

