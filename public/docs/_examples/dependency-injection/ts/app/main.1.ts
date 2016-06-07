/* tslint:disable:no-unused-variable */
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component.1';
import { HeroService }  from './heroes/hero.service.1';

bootstrap(AppComponent);

function discouraged() {
  // #docregion bootstrap-discouraged
  bootstrap(AppComponent,
           [HeroService]); // DISCOURAGED (but works)
  // #enddocregion bootstrap-discouraged
}
