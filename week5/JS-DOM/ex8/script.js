/*
    Make a Todo List
    0) Make it so that after entering the task and clicking the "Add Task" button, that new task appears inside the todo-list.
    1) Add the ability to check off tasks by clicking on them - (text-decoration:strikethrough is a nice way to)
    BONUS) Add a functioning "delete" button to each task (HINT: use the keyword "this" in your delete button's click listener! Console log "this" to see what value it holds)
    SUPER BONUS) Make each task editable
*/

var addButton = document.getElementById('add-button');

addButton.addEventListener('click', function() {

    var toDoList = document.getElementById('todo-list');
    var newItem = document.getElementById('description');
    // proceed if there's a value in the input field
    if (newItem.value != '') {
        var newLi = document.createElement('li');
        newLi.className = 'todo-item';
        
        // add li to ul, take input value and assign to newly created li, then clear the input field
        toDoList.appendChild(newLi);
        newLi.innerHTML = newItem.value;
        newItem.value = '';

        // send the collection of li to a variable by classname
        var todoItems = document.getElementsByClassName('todo-item');
        // add event listener and use event.target to strike through items
        for (var i = 0; i < todoItems.length; i++) {
            todoItems[i].addEventListener('click', function(event) {
                if (event.target.matches('li')) { // <-- used target.matches to specify li items and not children (delete button)
                    event.target.style.textDecoration = 'line-through';
                }
                    
            })
        }
    }
        // create delete buttons and appending as children to created li items
        var delButton = document.createElement('button');
        delButton.className = 'dbuttons';
        delButton.innerHTML= 'delete item'; // <-- adding name to button
        newLi.appendChild(delButton); // <-- appending new button as child to 'li' item

        // create collection of delete buttons and add eventlistener to delete parent node
        var dButtons = document.getElementsByClassName('dbuttons');
        for (var i = 0; i < dButtons.length; i++) {
            dButtons[i].addEventListener('click', function(event) {
                event.currentTarget.parentNode.remove();
            })    
 
        }
       
   
});

        

    
        


    






