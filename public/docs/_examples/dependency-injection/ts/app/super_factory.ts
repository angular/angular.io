import {Engine, Tires} from './car';

class Car {
  constructor(private engine: Engine, private tires: Tires) { }
}

// #docregion
class SuperFactory {

  createEngine() {
    return new Engine();
  }

  createTires() {
    return new Tires();
  }

  createCar() {
    return new Car(this.createEngine(), this.createTires());
  }
}
// #enddocregion
