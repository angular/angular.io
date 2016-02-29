// #docplaster

// #docregion
import {Injectable} from 'angular2/core';

export class Crisis {
  constructor(public id: number, public name: string) { }
}

@Injectable()
export class CrisisService {
  getCrises() { return crisesPromise; }

  getCrisis(id: number | string) {
    return crisesPromise
      .then(crises => crises.filter(c => c.id === +id)[0]);
  }

// #enddocregion

  static nextCrisisId = 100;

  addCrisis(name:string) {
    name = name.trim();
    if (name){
      let crisis = new Crisis(CrisisService.nextCrisisId++, name);
      crisesPromise.then(crises => crises.push(crisis));
    }
  }
// #docregion
}

var crises = [
  new Crisis(1, 'Dragon Burning Cities'),
  new Crisis(2, 'Sky Rains Great White Sharks'),  
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];

var crisesPromise = Promise.resolve(crises);
// #enddocregion
