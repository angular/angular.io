// #docplaster
// #docregion
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent }    from './hero-list.component';
import { HeroCounterComponent } from './hero-counter.component';
import { AddHeroComponent }     from './add-hero.component';

const appRoutes: Routes = [
  { path: 'hero/add', component: AddHeroComponent },
  { path: 'hero/counter', component: HeroCounterComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
