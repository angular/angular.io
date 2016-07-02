// #docplaster
// #docregion
import { Injectable } from '@angular/core';

export class Crisis {
  constructor(public id: number, public name: string) { }
}

let crises = [
  new Crisis(1, 'Dragon Burning Cities'),
  new Crisis(2, 'Sky Rains Great White Sharks'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];

let crisesPromise = Promise.resolve(crises);

@Injectable()
export class CrisisService {
  getCrises() { return crisesPromise; }

  getCrisis(id: number | string) {
    return crisesPromise
      .then(crises => crises.find(c => c.id === +id));
  }

// #enddocregion

  static nextCrisisId = 100;

  addCrisis(name: string) {
    name = name.trim();
    if (name) {
      let crisis = new Crisis(CrisisService.nextCrisisId++, name);
      crisesPromise.then(crises => crises.push(crisis));
    }
  }
// #docregion
}
// #enddocregion
