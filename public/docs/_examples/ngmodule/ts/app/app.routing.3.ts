import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full'},
  { path: 'crisis', loadChildren: 'app/crisis/crisis.module' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module.3' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
