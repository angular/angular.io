/* First version */
// #docplaster
// #docregion all
// main entry point
import { bootstrap }          from '@angular/platform-browser-dynamic';
import { AppComponent }       from './app.component';
import { appRouterProviders } from './app.routes';

// #enddocregion

/* Can't use AppComponent ... but display as if we can
// #docregion all

bootstrap(AppComponent, [
// #enddocregion all
*/
// Actually use the v.1 component
import { AppComponent as ac } from './app.component.ts'; // './app.component.1';

bootstrap(ac, [
// #docregion all
  appRouterProviders
])
.catch(err => console.error(err));
// #enddocregion all
