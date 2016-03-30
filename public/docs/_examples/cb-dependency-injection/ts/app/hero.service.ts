// #docregion
import {Injectable} from 'angular2/core';
import {Hero}       from './hero';

@Injectable()
export class HeroService {

  //TODO move to database
  private _heros:Array<Hero> = [
    new Hero(1, 'RubberMan','Hero of many talents', '123-456-7899'),
    new Hero(2, 'Magma','Hero of all trades', '555-555-5555'),
    new Hero(3, 'Mr. Nice','The name says it all','111-222-3333')
 ];

  getHeroById(id:number):Hero{
    return this._heros.filter(hero => hero.id === id)[0];
  }

  getAllHeroes():Array<Hero>{
    return this._heros;
  }
}