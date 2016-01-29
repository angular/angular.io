/* First version */
// #docplaster

// #docregion all
import {AppComponent}     from './app.component';
import {bootstrap}        from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

// #enddocregion all

/* Can't use AppComponent ... but display as if we can
// #docregion all
bootstrap(AppComponent, [
// #enddocregion all
*/

// Actually use the v.1 component
import {AppComponent as ac} from './app.component.1';
bootstrap(ac, [
// #docregion all
  ROUTER_PROVIDERS
]);
// #enddocregion all