/* Second version */
// For Milestone #2
// Also includes digression on HashPathStrategy (not used in the final app)
// #docplaster

// #docregion
import {bootstrap}         from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS}  from '@angular/router';
import {AppComponent}      from './app.component';

// Add these symbols to override the `LocationStrategy`
import {provide}           from '@angular/core';
import {LocationStrategy,
        HashLocationStrategy} from '@angular/common';
// #enddocregion
/* Can't use AppComponent ... but display as if we can
// #docregion

bootstrap(AppComponent, [
// #enddocregion
*/

// Actually use the v.2 component
import {AppComponent as ac} from './app.component.2';

bootstrap(ac, [
// #docregion
  ROUTER_PROVIDERS,
  provide(LocationStrategy,
         {useClass: HashLocationStrategy}) // .../#/crisis-center/
]);
// #enddocregion
