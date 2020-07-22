
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

const btnLogin = document.getElementById('btnLog');
const btnSignup = document.getElementById('btnSignup');
const btnLogout = document.getElementById('btnLogout');


// Sign up
btnSignup.addEventListener("click", function() {
    const email = emailField.value; 
    const password = passwordField.value;
    //const auth = firebase.auth();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
        console.log(data);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        
      });
})



// Log in
btnLogin.addEventListener('click', function() {
    const email = emailField.value; 
    const password = passwordField.value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
        var user = firebase.auth().currentUser;
        if (user) {
            window.location.href = './dash.html';
        } else {
            window.location.href = './index.html';
        }
    })
    .catch(function(error) {
        console.log(email + " logged in")
        var errorCode = error.code;
        var errorMessage = error.message;
      });
})


