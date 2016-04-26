// #docplaster
//#docregion
import 'package:angular2/core.dart';

import '../logger_service.dart';
import 'car.dart';

//#docregion injector
Car useInjector() {
  ReflectiveInjector injector;
  //#enddocregion injector

  /*
//#docregion injector-no-new
  // Cannot 'new' an ReflectiveInjector like this!
  var injector = new ReflectiveInjector([Car, Engine, Tires, Logger]);
//#enddocregion injector-no-new
*/

  //#docregion injector

  //#docregion injector-create-and-call
  injector = ReflectiveInjector.resolveAndCreate([Car, Engine, Tires, Logger]);
  //#docregion injector-call
  var car = injector.get(Car);
  //#enddocregion injector-call
  //#enddocregion injector-create-and-call

  car.description = 'Injector';
  var logger = injector.get(Logger);
  logger.log('Injector car.drive() said: ' + car.drive());
  return car;
}
//#enddocregion injector

//#enddocregion
