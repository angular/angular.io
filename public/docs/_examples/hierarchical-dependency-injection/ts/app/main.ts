// #docregion
import { bootstrap }           from '@angular/platform-browser-dynamic';

import { HeroesListComponent } from './heroes-list.component';
import { HeroesService }       from './heroes.service';

bootstrap(HeroesListComponent, [HeroesService]);

/* Documentation artifact below
// #docregion bad-alternative
// Don't do this!
bootstrap(HeroesListComponent, [HeroesService, RestoreService])
// #enddocregion bad-alternative
*/
