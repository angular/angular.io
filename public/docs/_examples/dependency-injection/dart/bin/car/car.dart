// #docregion
import "package:angular2/core.dart";

// #docregion engine
class Engine {
  var cylinders = 4;
}
// #enddocregion engine

// #docregion tires
class Tires {
  var make = "Flintstone";
  var model = "Square";
}

// #enddocregion tires
@Injectable()
class Car {
  Engine engine;
  Tires tires;
  //#docregion car-ctor
  var description = "DI";
  Car(this.engine, this.tires) {}
  // #enddocregion car-ctor

  // Method using the engine and tires
  drive() {
    return '''${ this . description} car with ''' +
        '''${ this . engine . cylinders} cylinders and ${ this . tires . make} tires.''';
  }
}
// #enddocregion car
