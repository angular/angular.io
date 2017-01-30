// #docplaster
// #docregion
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHeroComponent }     from './add-hero.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroSearchComponent }  from './hero-search.component';
import { HeroListComponent }    from './hero-list.component';
import { HeroCounterComponent } from './hero-counter.component';

const appRoutes: Routes = [
  { path: 'heroes/add', component: AddHeroComponent },
  { path: 'heroes/search', component: HeroSearchComponent },
  { path: 'hero/counter', component: HeroCounterComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
