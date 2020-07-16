
//creating characters
const heroName = prompt("Please enter hero's name");
const villainName = prompt("Please enter villain's name");
const heroPerson = new Hero(heroName);
const villainPerson = new Villain(villainName);

//array of weapons
const weaponsArr = ["mase", "club", "hammer", "crowbar", "ninja sword", "broad sword", "bubbles"];

//creating and assigning weapons to both characters
heroPerson.equipWeapon(new Weapon(weaponsArr[Math.floor(Math.random() * weaponsArr.length)]));
villainPerson.equipWeapon(new Weapon(weaponsArr[Math.floor(Math.random() * weaponsArr.length)]));

const hContainer = document.getElementById("hero");
const vContainer = document.getElementById("villain");

// calling render function to display stats
hContainer.innerHTML = heroPerson.render();
vContainer.innerHTML = villainPerson.render();

const heroButton = document.getElementById("herobutton");
const villainButton = document.getElementById("villainbutton");

heroButton.addEventListener("click", function() {
    heroPerson.attack(villainPerson);
    if (villainPerson.health <= 0) {
        alert("Hero Wins!");
    }

    // update the health of villain after being attacked
    document.getElementById("vHealth").innerHTML = villainPerson.health;
})

villainButton.addEventListener("click", function() {
    villainPerson.attack(heroPerson);
    if (heroPerson.health <= 0) {
        alert("Villain Wins!");
    }

    // update the health of hero after being attacked
    document.getElementById("hHealth").innerHTML = heroPerson.health;
})

