// #docregion
import 'package:angular2/core.dart';

@Injectable()
// #docregion engine
class Engine {
  final int cylinders = 4;
}
// #enddocregion engine

@Injectable()
// #docregion tires
class Tires {
  String make = 'Flintstone';
  String model = 'Square';
}

// #enddocregion tires
@Injectable()
class Car {
  //#docregion car-ctor
  final Engine engine;
  final Tires tires;
  String description = 'DI';

  Car(this.engine, this.tires);

  // #enddocregion car-ctor

  // Method using the engine and tires
  String drive() => '$description car with ${engine.cylinders} cylinders'
      ' and ${tires.make} tires.';
}
// #enddocregion car
