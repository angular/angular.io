/* Second version */
// For Milestone #2
// Also includes digression on HashPathStrategy (not used in the final app)
// #docplaster

// #docregion
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { provideRouter }        from '@angular/router';

// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { AppComponent }         from './app.component';
import { routes }               from './app.routes.2';

// #enddocregion
/* Can't use AppComponent ... but display as if we can
// #docregion

bootstrap(AppComponent, [
// #enddocregion
*/

// Actually use the v.2 component
import { AppComponent as ac } from './app.component.2';

bootstrap(ac, [
// #docregion
  provideRouter(routes),
  { provide: LocationStrategy,
         useClass: HashLocationStrategy } // .../#/crisis-center/
]);
// #enddocregion
