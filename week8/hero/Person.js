console.log("Person Class Called");

class Person {
    constructor(name) {
      this.name = name;
      this.health = 100;
      this.weapon = null;
    }
    
    equipWeapon(weapon) {
      this.weapon = weapon;
    }

    attack(person) {
      let hit = Math.floor(Math.random() * 10);
      if (hit > 3 ) {
        person.health -= this.weapon.damage;
      } else {
        alert("missed");
      }
    }

  }