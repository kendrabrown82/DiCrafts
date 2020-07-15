class Weapon {
    constructor(name) {
        this.name = name;
        this.damage = Math.round(10 + (Math.random() * 10));
    }
}