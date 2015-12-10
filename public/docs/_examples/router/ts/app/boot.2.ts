/* Second version */
// For Milestone #2
// Also includes digression on HashPathStrategy (not used in the final app)
// #docplaster

// #docregion v2
// #docregion hash-strategy
import {bootstrap}         from 'angular2/platform/browser';
import {ROUTER_PROVIDERS}  from 'angular2/router';
import {AppComponent}      from './app.component';
// #enddocregion hash-strategy
import {HeroService}       from './heroes/hero.service';
// #enddocregion v2

// #docregion hash-strategy

// Add these symbols to register a `LocationStrategy`
import {provide}           from 'angular2/core';
import {LocationStrategy,
        HashLocationStrategy} from 'angular2/router';
// #enddocregion hash-strategy

/* Can't use AppComponent ... but display as if we can
// #docregion v2,hash-strategy

bootstrap(AppComponent, [
// #enddocregion v2,hash-strategy
*/

// Actually use the v.2 component
import {AppComponent as ac} from './app.component.2';

bootstrap(ac, [
// #docregion hash-strategy

  provide(LocationStrategy,
         {useClass: HashLocationStrategy}), // ~/src/#/crisis-center/

// #enddocregion hash-strategy
// #docregion v2
  HeroService,
// #docregion hash-strategy
  ROUTER_PROVIDERS
]);
// #enddocregion hash-strategy
// #enddocregion v2

