// #docregion
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { provideRouter }    from '@angular/router';
import { routes }           from './app.routes';
import { AppComponent }     from './app.component.3';

bootstrap(AppComponent, [
  provideRouter(routes)
]);
