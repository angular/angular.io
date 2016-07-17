import { RouterModule, Routes} from '@angular/router';

import { HeroListComponent }   from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes =  [
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroListComponent }
];

export const routing = RouterModule.forChild(routes);
