// #docregion
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { provideRouter }    from '@angular/router';
import { AppComponent }     from './app.component';
import { routes }           from './app.routes';
import { DialogService }    from './dialog.service';

bootstrap(AppComponent, [
  provideRouter(routes),
  DialogService
]);
