// #docregion
// #docplaster
// #docregion base-hero-spec
import { Hero } from './hero';

describe('Hero', () => {

  it('has name', () => {
    let hero: Hero = {id: 1, name: 'Super Cat'};
    expect(hero.name).toEqual('Super Cat');
  });

  it('has id', () => {
    let hero: Hero = {id: 1, name: 'Super Cat'};
    expect(hero.id).toEqual(1);
  });
  // #enddocregion base-hero-spec


  /* more tests we could run

  it('can clone itself', () => {
    let hero = new Hero(1, 'Super Cat');
    let clone = hero.clone();
    expect(hero).toEqual(clone);
  });

  it('has expected generated id when id not given in the constructor', () => {
    Hero.setNextId(100); // reset the `nextId` seed
    let hero = new Hero(null, 'Cool Kitty');
    expect(hero.id).toEqual(100);
  });

  it('has expected generated id when id=0 in the constructor', () => {
    Hero.setNextId(100);
    let hero = new Hero(0, 'Cool Kitty');
    expect(hero.id).toEqual(100);
  })

  it('increments generated id for each new Hero w/o an id', () => {
    Hero.setNextId(100);
    let hero1 = new Hero(0, 'Cool Kitty');
    let hero2 = new Hero(null, 'Hip Cat');
    expect(hero2.id).toEqual(101);
  });

  */
  // #docregion base-hero-spec
});
// #enddocregion base-hero-spec
