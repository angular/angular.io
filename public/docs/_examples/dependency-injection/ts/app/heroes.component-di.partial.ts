//#docregion
//#docregion ctor-signature
constructor(heroService: HeroService) {
//#enddocregion ctor-signature
  this.heroes = heroService.getHeroes();
}
//#enddocregion

//#docregion ctor-di-fail
// FAIL!
constructor(heroService: HeroService, config: config)
//#enddocregion ctor-di-fail


//#docregion inject-decorator
import {Inject} from 'angular2/angular2'

constructor(heroService: HeroService, @Inject('app.config') config)
//#enddocregion inject-decorator
