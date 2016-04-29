/* First version */
// #docplaster

// #docregion all
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { provideRouter }    from '@angular/router';

import { AppComponent }     from './app.component';
import { routes }           from './app.routes';
// #enddocregion all

/* Can't use AppComponent ... but display as if we can
// #docregion all
bootstrap(AppComponent, [
// #enddocregion all
*/

// Actually use the v.1 component
import { AppComponent as ac } from './app.component.1';
bootstrap(ac, [
// #docregion all
  provideRouter(routes)
]);
// #enddocregion all
