/* Second version */
// For Milestone #2
// Also includes digression on HashPathStrategy (not used in the final app)
// #docplaster
// #docregion
// main entry point
import { bootstrap }            from '@angular/platform-browser-dynamic';

// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { AppComponent }         from './app.component';
import { appRouterProviders }   from './app.routes';

// #enddocregion

/* Can't use AppComponent ... but display as if we can
// #docregion
bootstrap(AppComponent, [
// #enddocregion
*/
// Actually use the v.2 component
import { AppComponent as ac } from './app.component.ts'; // './app.component.2';

bootstrap(ac, [
// #docregion
  appRouterProviders,
  { provide: LocationStrategy, useClass: HashLocationStrategy } // .../#/crisis-center/

])
.catch(err => console.error(err));
// #enddocregion
