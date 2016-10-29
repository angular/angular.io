// #docplaster
// #docregion
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
// #docregion import-router, route-config
import { RouterModule, Routes } from '@angular/router';
// #enddocregion import-router, route-config

// #docregion router-basics
import { AppComponent }         from './app.component';
import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';

// #docregion route-config
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent }
];
// #enddocregion route-config

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HeroListComponent,
    CrisisListComponent
  ],
  bootstrap: [ AppComponent ]
})
// #enddocregion router-basics
export class AppModule {
}
// #enddocregion
