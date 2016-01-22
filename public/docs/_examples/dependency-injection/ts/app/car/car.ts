// #docregion
import {Injectable} from 'angular2/core';

// #docregion engine
export class Engine {
  public cylinders = 4; // default
}
// #enddocregion engine

// #docregion tires
export class Tires {
  public make  = 'Flintstone';
  public model = 'Square';
}
// #enddocregion tires

@Injectable()
// #docregion car
export class Car {
  //#docregion car-ctor
  public description = 'DI';

  constructor(public engine: Engine, public tires: Tires) { }
  // #enddocregion car-ctor

  // Method using the engine and tires
  drive() {
    return `${this.description} car with ` +
      `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`
  }
}
// #enddocregion car
