// #docplaster
// #docregion routes
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisListComponent }       from './crisis-list.component';
import { CrisisCenterComponent }     from './crisis-center.component';
import { CrisisDetailComponent }     from './crisis-detail.component';
// #enddocregion routes

// #docregion can-deactivate-guard
import { CanDeactivateGuard }    from '../can-deactivate-guard.service';
// #enddocregion can-deactivate-guard
// #docregion crisis-detail-resolve
import { CrisisDetailResolve }   from './crisis-detail-resolve.service';

// #enddocregion crisis-detail-resolve
// #docregion routes

const crisisCenterRoutes: Routes = [
// #enddocregion routes
  // #docregion redirect, routes
  {
    path: '',
    redirectTo: '/crisis-center',
    pathMatch: 'full'
  },
  // #enddocregion redirect, routes
  // #docregion routes
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
  // #enddocregion routes
            // #docregion can-deactivate-guard
            canDeactivate: [CanDeactivateGuard],
            // #enddocregion can-deactivate-guard
            // #docregion crisis-detail-resolve
            resolve: {
              crisis: CrisisDetailResolve
            }
            // #enddocregion crisis-detail-resolve
  // #docregion routes
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
  // #docregion routes
];

export const crisisCenterRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);
// #enddocregion
