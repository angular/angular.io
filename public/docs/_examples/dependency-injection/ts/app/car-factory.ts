import {Engine, Tires, Car} from './car';

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
