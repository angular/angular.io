// #docregion
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './app-routing.module';
import { AddHeroComponent }           from './add-hero.component';
import { LoadingComponent }           from './loading.component';
import { HeroSearchComponent }        from './hero-search.component';
import { HeroDetailComponent }        from './hero-detail.component';
import { HeroListComponent }          from './hero-list.component';
import { HeroCounterComponent }       from './hero-counter.component';
import { LoadingService }             from './loading.service';
import { HeroService }                from './hero.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { ApiErrorHandlerService } from './api-error-handler.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    AddHeroComponent,
    LoadingComponent,
    HeroSearchComponent,
    HeroDetailComponent,
    HeroListComponent,
    HeroCounterComponent
  ],
  providers: [
    HeroService,
    LoadingService,
    ApiErrorHandlerService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
// #enddocregion
