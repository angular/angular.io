import { Injectable } from '@angular/core';

export class Hero {
  constructor(public name:string,
              public state = 'inactive') {
  }

  toggleState() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }
}

@Injectable()
export class Heroes implements Iterable<Hero> {

  currentHeroes: Hero[] = [];

  [Symbol.iterator]() {
    return this.currentHeroes.values();
  }

  canAdd() {
    return this.currentHeroes.length < ALL_HEROES.length;
  }

  canRemove() {
    return this.currentHeroes.length > 0;
  }

  add() {
    this.currentHeroes.push(ALL_HEROES[this.currentHeroes.length]);
  }

  remove() {
    this.currentHeroes.splice(this.currentHeroes.length - 1, 1);
  }

}

var ALL_HEROES = [
  'Wolverine',
  'Magneto',
  'Emma Frost',
  'Thing',
  'Kitty Pryde',
  'Nightcrawler',
  'Juggernaut',
  'Beast',
  'Captain America',
  'Spider-Man',
  'Puck',
  'Alex Wilder',
  'Doctor Strange'
].map(name => new Hero(name));
