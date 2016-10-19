// #docplaster
// #docregion
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisCenterComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
