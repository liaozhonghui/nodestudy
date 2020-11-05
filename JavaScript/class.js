class Car {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }
    setMake(make) {
        this.make = make;
        return this;
    }
    setModel(model) {
        this.model = model;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    save() {
        console.log(this.make, this.model, this.color);
        return this;
    }
}

var car = new Car('Ford', 'F-150', 'red')
    .setColor('pink')
    .save()
    .setMake('Liao')
    .save()