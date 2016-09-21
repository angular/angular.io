// #docplaster
// #docregion
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisListComponent }       from './crisis-list.component';
import { CrisisCenterComponent }     from './crisis-center.component';
import { CrisisDetailComponent }     from './crisis-detail.component';

import { CanDeactivateGuard }    from '../can-deactivate-guard.service';

// #docregion crisis-detail-resolve
import { CrisisDetailResolve }   from './crisis-detail-resolve.service';

const crisisCenterRoutes: Routes = [
  // #docregion redirect
  {
    path: '',
    redirectTo: '/crisis-center',
    pathMatch: 'full'
  },
  // #enddocregion redirect
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolve
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

export const crisisCenterRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);
// #enddocregion
