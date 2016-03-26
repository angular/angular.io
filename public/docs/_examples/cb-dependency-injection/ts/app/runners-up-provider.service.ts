// #docregion
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {RunnersUp} from './runners-up';

export const runnersUpFactory = (winner:Hero, heroService:HeroService) => {
  let names:string = heroService.getAllHeroes()
                                .filter((hero) => hero.name !== winner.name)
                                .map((hero) => hero.name).join(', '); 
               
  return new RunnersUp(names);             
};