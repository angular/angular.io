import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HeroService}  from './heroes/hero.service';

//#docregion bootstrap
// Injecting services in bootstrap works but is discouraged
bootstrap(AppComponent, [HeroService]);
//#enddocregion bootstrap
