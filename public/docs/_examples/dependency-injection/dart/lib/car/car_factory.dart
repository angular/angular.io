// #docregion
import 'car.dart';

// BAD pattern!
class CarFactory {
  Car createCar() {
    var car = new Car(createEngine(), createTires());
    car.description = 'Factory';
    return car;
  }

  Engine createEngine() => new Engine();
  Tires createTires() => new Tires();
}
