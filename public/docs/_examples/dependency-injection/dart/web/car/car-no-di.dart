// Car without DI
import "car.dart";

//#docregion car
class Car {
  //#docregion car-ctor
  Engine engine;
  Tires tires;
  var description = "No DI";
  Car() {
    engine = new Engine();
    tires = new Tires();
  }
  //#enddocregion car-ctor

  // Method using the engine and tires
  drive() {
    return '''${ this . description} car with ''' +
        '''${ this . engine . cylinders} cylinders and ${ this . tires . make} tires.''';
  }
}
//#enddocregion car
