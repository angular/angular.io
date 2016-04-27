// #docplaster
//#docregion
import { ReflectiveInjector }         from '@angular/core';

import {Car, Engine, Tires} from './car';
import {Logger}             from '../logger.service';

//#docregion injector
export function useInjector() {
  var injector:ReflectiveInjector;

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
  logger.log('Injector car.drive() said: '+car.drive());

  return car;
}
//#enddocregion injector


//#enddocregion
