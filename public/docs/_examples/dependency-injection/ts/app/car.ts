// #docregion
// #docregion car
class Engine {}

class Tires {}

class Car {
  private engine: Engine;
  private tires: Tires;

  constructor() {
    this.engine = new Engine();
    this.tires = new Tires();
  }

  // Method using the engine and tires
  drive() {}
}
//#enddocregion car

//#docregion car-ctor-instantiation
var car = new Car(new Engine(), new Tires());
//#enddocregion car-ctor-instantiation

//#docregion car-ctor-instantiation-with-param
var theNewParameter = false;
var car = new Car(new Engine(theNewParameter), new Tires());
//#enddocregion car-ctor-instantiation-with-param

//#docregion car-ctor-instantiation-with-mocks
class MockEngine {}

class MockLowPressureTires {}

var car = new Car(new MockEngine(), new MockLowPressureTires());
//#enddocregion car-ctor-instantiation-with-mocks
// #enddocregion
