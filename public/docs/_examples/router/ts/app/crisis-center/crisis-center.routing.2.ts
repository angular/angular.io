// #docregion
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';

// #docregion routes
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
      { path: ':id',  component: CrisisDetailComponent },
      { path: '',     component: CrisisListComponent }
    ]
  }
];

export const crisisCenterRouting: ModuleWithProviders = RouterModule.forChild(crisisCenterRoutes);
// #enddocregion routes
