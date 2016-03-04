// #docregion
import {Injectable}  from 'angular2/core';
import {Hero}        from './hero';
import {HeroService} from './hero.service';

// #docregion service
@Injectable()
export class HeroCacheService {
  hero:Hero;
  constructor(private _heroService:HeroService){}

  fetchCachedHero(id:number){
    if (!this.hero) {
      this.hero = this._heroService.getHeroById(id);
    }
    return this.hero
  }
}
// #enddocregion service
