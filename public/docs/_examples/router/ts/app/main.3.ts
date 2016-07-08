/* third version */
// #docregion
// main entry point
import { bootstrap }          from '@angular/platform-browser-dynamic';
import { AppComponent }       from './app.component.3';
import { appRouterProviders } from './app.routes';

bootstrap(AppComponent, [
  appRouterProviders
])
.catch(err => console.error(err));
