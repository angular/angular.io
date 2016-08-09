// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }       from './app.component';
import { routing,
         appRoutingProviders } from './app.routing';

// #docregion hero-import
import { HeroesModule }         from './heroes/heroes.module';

import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HeroesModule
  ],
  declarations: [
    AppComponent,
    CrisisListComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
// #enddocregion hero-import
export class AppModule {
}
// #enddocregion
