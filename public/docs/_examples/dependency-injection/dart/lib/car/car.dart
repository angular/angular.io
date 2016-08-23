import 'package:angular2/core.dart';

@Injectable()
class Engine {
  final int cylinders;

  Engine() : cylinders = 4;
  Engine.withCylinders(this.cylinders);
}

@Injectable()
class Tires {
  String make = 'Flintstone';
  String model = 'Square';
}

@Injectable()
class Car {
  //#docregion car-ctor
  final Engine engine;
  final Tires tires;
  String description = 'DI';

  Car(this.engine, this.tires);
  // #enddocregion car-ctor

  // Method using the engine and tires
  String drive() => '$description car with '
      '${engine.cylinders} cylinders and '
      '${tires.make} tires.';
}
