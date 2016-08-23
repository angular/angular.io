import 'package:angular2/core.dart';

import '../logger_service.dart';
import 'car.dart';

// #docregion injector
Car useInjector() {
  ReflectiveInjector injector;
  // #enddocregion injector
  /*
  // #docregion injector-no-new
  // Cannot instantiate an ReflectiveInjector like this!
  var injector = new ReflectiveInjector([Car, Engine, Tires]);
  // #enddocregion injector-no-new
  */
  // #docregion injector, injector-create-and-call
  injector = ReflectiveInjector.resolveAndCreate([Car, Engine, Tires]);
  // #docregion injector-call
  var car = injector.get(Car);
  // #enddocregion injector-call, injector-create-and-call
  car.description = 'Injector';

  injector = ReflectiveInjector.resolveAndCreate([Logger]);
  var logger = injector.get(Logger);
  logger.log('Injector car.drive() said: ' + car.drive());
  return car;
}
