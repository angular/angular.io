import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroListComponent } from './heroes/hero-list.component';
import { InjectorComponent } from './injector.component';
import { TestComponent } from './test.component';
import { ProvidersComponent } from './providers.component';
import { APP_CONFIG, HERO_DI_CONFIG }    from './app.config';
import { UserService } from './user.service';

// #docregion ngmodule
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    CarComponent,
    HeroesComponent,
    HeroListComponent,
    InjectorComponent,
    TestComponent
  ],
  // #docregion ngmodule-providers
  providers: [
    UserService,
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
  ],
  // #enddocregion ngmodule-providers
  bootstrap: [ AppComponent, ProvidersComponent ]
})
export class AppModule { }
// #enddocregion ngmodule
