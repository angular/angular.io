// #docplaster
// #docregion
// #docregion router-basics
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }           from './app.component';
import { HeroListComponent }      from './hero-list.component';
import { CrisisListComponent }    from './crisis-list.component';
import { PageNotFoundComponent }  from './not-found.component';
import { PageNotFoundComponent as HeroDetailComponent } from './not-found.component';
import { PageNotFoundComponent as HomeComponent } from './not-found.component';

// #docregion route-config
const appRoutes: Routes = [
  // #docregion route-defs
  // #docregion hero-detail-route
  { path: 'hero/:id', component: HeroDetailComponent },
  // #enddocregion hero-detail-route
  { path: 'crisis-center', component: CrisisListComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: {
      title: 'Heroes List'
    }
  },
  { path: '', component: HomeComponent },
  // #enddocregion route-defs
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HeroListComponent,
    HeroDetailComponent,
    CrisisListComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
// #enddocregion router-basics
export class AppModule {
}
// #enddocregion
