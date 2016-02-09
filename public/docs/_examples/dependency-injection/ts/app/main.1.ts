import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HeroService}  from './heroes/hero.service';

//#docregion bootstrap
bootstrap(AppComponent,
         [HeroService]); // DISCOURAGED (but works)
//#enddocregion bootstrap
