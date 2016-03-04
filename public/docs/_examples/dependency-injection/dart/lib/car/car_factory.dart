// #docregion
import 'car.dart';

// BAD pattern!
class CarFactory {
  Car createCar() {
    return new Car(createEngine(), createTires())
      ..description = 'Factory';
  }

  Engine createEngine() => new Engine();
  Tires createTires() => new Tires();
}
