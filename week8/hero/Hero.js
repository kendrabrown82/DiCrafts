console.log("Hero Class Called");

class Hero extends (Person) {
    constructor(name) {
        super(name);
    }

    render() {
        return `
            <ul>
                <li>Name: ${this.name}</li>
                <li id="hHealth">Health : ${this.health}</li>
                <li>Weapon : ${this.weapon.name}</li>

            </ul>
        
            <button id="herobutton">Attack the Villain!</button>
            <div>
                <img src="mario.png">
            </div>

        `
    }
}