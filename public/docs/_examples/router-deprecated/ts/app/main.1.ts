/* First version */
// #docplaster

// #docregion all
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppComponent }     from './app.component';

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
  ROUTER_PROVIDERS
]);
// #enddocregion all
