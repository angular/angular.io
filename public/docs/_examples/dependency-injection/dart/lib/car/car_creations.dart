// #docplaster
// Examples with car and engine variations
import 'car.dart';

///////// example 1 ////////////
Car simpleCar() =>
  // #docregion car-ctor-instantiation
  // Simple car with 4 cylinders and Flintstone tires.
  new Car(new Engine(), new Tires())
  // #enddocregion car-ctor-instantiation
  ..description = 'Simple';

///////// example 2 ////////////

// #docregion car-ctor-instantiation-with-param
class Engine2 extends Engine {
  Engine2(cylinders) : super.withCylinders(cylinders);
}

Car superCar() =>
  // Super car with 12 cylinders and Flintstone tires.
  new Car(new Engine2(12), new Tires())
  ..description = 'Super';
// #enddocregion car-ctor-instantiation-with-param

/////////// example 3 //////////

// #docregion car-ctor-instantiation-with-mocks
class MockEngine extends Engine {
  MockEngine() : super.withCylinders(8);
}

class MockTires extends Tires {
  MockTires() { make = 'YokoGoodStone'; }
}

Car testCar() =>
  // Test car with 8 cylinders and YokoGoodStone tires.
  new Car(new MockEngine(), new MockTires())
  ..description = 'Test';
// #enddocregion car-ctor-instantiation-with-mocks
