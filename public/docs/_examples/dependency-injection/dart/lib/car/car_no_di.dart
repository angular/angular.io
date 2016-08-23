// Car without DI

import 'car.dart';

//#docregion car
class Car {
  //#docregion car-ctor
  Engine engine;
  Tires tires;
  var description = 'No DI';

  Car() {
    engine = new Engine();
    tires = new Tires();
  }
  //#enddocregion car-ctor

  // Method using the engine and tires
  String drive() => '$description car with '
    '${engine.cylinders} cylinders and '
    '${tires.make} tires.';
}
//#enddocregion car
