// #docregion
import "car.dart";

class CarFactory {
  createCar() {
    var car = new Car(createEngine(), createTires());
    car.description = "Factory";
    return car;
  }

  createEngine() => new Engine();

  createTires() => new Tires();
}
