// #docregion
import {Hero}       from './hero';
import {Injectable} from 'angular2/core';

@Injectable()
export class HeroService{
  
  currentHero:Hero;
  
  //TODO move to database
  private _heros:Array<Hero> = [new Hero('RubberMan','Hero of many talents', '123-456-7899'),
                                new Hero('Magma','Hero of all trades', '555-555-5555'),
                                new Hero('Mr. Nice','The name says it all','111-222-3333')];
  
  getHeroById(index:number):Hero{
    if(!this.currentHero){
      let heroes = this.getAllHeroes();
      this.currentHero = heroes[index];
    }
    
    return this.currentHero;
  }  
  
  getAllHeroes():Array<Hero>{
    return this._heros;
  }
}