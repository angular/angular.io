import {bootstrap} from 'angular2/core';
import {HeroService} from './hero_service';
import {HeroesComponent} from './heroes.component';

//#docregion
bootstrap(HeroesComponent, [HeroService]);
//#docregion
