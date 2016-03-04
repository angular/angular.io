// #docregion
import 'package:angular2/angular2.dart';

// #docregion engine
class Engine {
  int cylinders = 4;
}
// #enddocregion engine

// #docregion tires
class Tires {
  String make = 'Flintstone';
  String model = 'Square';
}

// #enddocregion tires
@Injectable()
class Car {
  //#docregion car-ctor
  Engine engine;
  Tires tires;
  String description = 'DI';

  Car(this.engine, this.tires);

  // #enddocregion car-ctor

  // Method using the engine and tires
  String drive() => '$description car with ${engine.cylinders} cylinders and ${tires.make} tires.';
}
// #enddocregion car
