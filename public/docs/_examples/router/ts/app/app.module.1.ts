// #docplaster
// #docregion
// #docregion first-config
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
// #docregion import-router
import { RouterModule, Routes } from '@angular/router';
// #enddocregion import-router

import { AppComponent }         from './app.component';
import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';
// #enddocregion first-config
import { PageNotFoundComponent }from './not-found.component';
// #docregion first-config

const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent },
// #enddocregion first-config
  { path: '**', component: PageNotFoundComponent }
// #docregion first-config
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
    CrisisListComponent,
// #enddocregion first-config
    PageNotFoundComponent
// #docregion first-config
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
// #enddocregion
