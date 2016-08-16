// #docregion
import { Hero } from './hero';

describe('Hero', () => {
  it('has name', () => {
    let hero = new Hero(1, 'Super Cat');
    expect(hero.name).toBe('Super Cat');
  });

  it('has id', () => {
    let hero = new Hero(1, 'Super Cat');
    expect(hero.id).toBe(1);
  });

  it('can clone itself', () => {
    let hero = new Hero(1, 'Super Cat');
    let clone = hero.clone();
    expect(hero).toEqual(clone);
  });
});
