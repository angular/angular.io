import { ReflectiveInjector } from '@angular/core';

import { Car, Engine, Tires } from './car';
import { Logger }             from '../logger.service';

// #docregion injector
export function useInjector() {
  var injector: ReflectiveInjector;
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
  logger.log('Injector car.drive() said: '+car.drive());
  return car;
}
