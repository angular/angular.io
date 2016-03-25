// #docplaster
// Examples with car and engine variations
import 'car.dart';

///////// example 1 ////////////
Car simpleCar() {
  //#docregion car-ctor-instantiation
  // Simple car with 4 cylinders and Flintstone tires.
  var car = new Car(new Engine(), new Tires());
  //#enddocregion car-ctor-instantiation
  car.description = 'Simple';
  return car;
}
///////// example 2 ////////////

//#docregion car-ctor-instantiation-with-param
class Engine2 implements Engine {
  final int cylinders;

  Engine2(this.cylinders);
}
//#enddocregion car-ctor-instantiation-with-param

Car superCar() {
//#docregion car-ctor-instantiation-with-param
// Super car with 12 cylinders and Flintstone tires.
var bigCylinders = 12;
var car = new Car(new Engine2(bigCylinders), new Tires());
//#enddocregion car-ctor-instantiation-with-param
  car.description = 'Super';
  return car;
}
/////////// example 3 //////////

//#docregion car-ctor-instantiation-with-mocks
class MockEngine extends Engine {
  final int cylinders = 8;
}

class MockTires extends Tires {
  String make = 'YokoGoodStone';
}

//#enddocregion car-ctor-instantiation-with-mocks
Car testCar() {
//#docregion car-ctor-instantiation-with-mocks
// Test car with 8 cylinders and YokoGoodStone tires.
var car = new Car(new MockEngine(), new MockTires());
//#enddocregion car-ctor-instantiation-with-mocks
  car.description = 'Test';
  return car;
}
