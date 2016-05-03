import { bootstrap }      from '@angular/platform-browser-dynamic';
// #docregion import
import { AppComponent } from './app.component';
// #enddocregion import
import { HeroService }    from './hero.service';
import { BackendService } from './backend.service';
import { Logger }         from './logger.service';

// #docregion bootstrap
bootstrap(AppComponent, [BackendService, HeroService, Logger]);
// #enddocregion bootstrap
