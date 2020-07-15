class Villain extends (Person) {
    constructor(name) {
        super(name);
    }

    render() {
        return `
            <ul>
                <li>Name: ${this.name}</li>
                <li id="vHealth">Health : ${this.health}</li>
                <li>Weapon : ${this.weapon.name}</li>

            </ul>

        <button id="villainbutton">Attack the Hero!</button>
        <div>
            <img src="wario.png">
        </div>
        `
    }

}