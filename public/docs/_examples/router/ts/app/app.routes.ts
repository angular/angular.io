import { RouteConfig }                from '@angular/router';
import { CrisisDetailComponent }      from './crisis-center/crisis-detail.component';
import { CrisisListComponent }        from './crisis-center/crisis-list.component';
import { CrisisCenterComponent }      from './crisis-center/crisis-center.component';
import { CanDeactivateCrisisDetail }  from './crisis-center/crisis-detail.guard';
import { HeroListComponent }          from './heroes/hero-list.component';
import { HeroDetailComponent }        from './heroes/hero-detail.component';

export const routes: RouteConfig = [
  // #docregion route-config
  {
      path: '/crisis-center',
      component: CrisisCenterComponent,
      index: true,
      children: [
        // #docregion default-route
        { path: '/', component: CrisisListComponent, index: true },
        // #enddocregion default-route
        {
          path: '/:id',
          component: CrisisDetailComponent
          //canDeactivate: [CanDeactivateCrisisDetail]
        }
      ]
  },
  { path: '/heroes',  component: HeroListComponent },
  { path: '/hero/:id', component: HeroDetailComponent }
  // #enddocregion route-config
];
