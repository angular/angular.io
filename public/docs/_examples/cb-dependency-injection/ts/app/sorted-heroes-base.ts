// #docregion
import {HeroService} from './hero.service';
import {Hero}        from './hero';

export class SortedHeroesBase{
  
  sortedHeroes:Array<Hero>;
  
  constructor(private heroService:HeroService){
    this.sortedHeroes = heroService.getAllHeroes();
    
    this.sortedHeroes.sort((h1,h2) => {
      if(h1.name < h2.name){
        return -1;  
      }
      if(h1.name > h2.name){
        return 1
      };
      return 0;
    });
  }
}