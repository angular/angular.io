// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';


// #docregion router-basics
import { AppComponent }       from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';

import { HeroListComponent }    from './hero-list.component';
import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HeroListComponent,
    CrisisListComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
// #enddocregion router-basics
export class AppModule {
}
// #enddocregion
