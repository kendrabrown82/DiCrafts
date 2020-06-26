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
    var newLi = document.createElement('li');
    var newButton = document.createElement('button');
    var liName = '';
    // add li to ul, take input value and assign to newly created li, then clear the input field
    toDoList.appendChild(newLi);
    newLi.innerHTML = newItem.value;
    newLi.setAttribute('id', newItem.value) //<-- adding id to each newly created li item
    liName = newLi.innerText;
    
    newButton.innerHTML= 'delete item'; // <-- adding name to button
    newItem.value = '';

    newLi.appendChild(newButton); // <-- appending new button as child to 'li' item
    newButton.setAttribute('id', liName);
   
});

