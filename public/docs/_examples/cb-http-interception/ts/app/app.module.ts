// #docregion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';

import { InMemoryWebApiModule }     from 'angular-in-memory-web-api';
import { HeroData }                 from './hero-data';

import { AppComponent }             from './app.component';
import { HeroListComponent }        from './hero-list.component';
import { HttpInterceptorProviders } from './http-interceptor';
import { HttpActivityLogger,
         HttpInterceptorRegistryService } from './http-interceptor-registry.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(HeroData)
  ],
  declarations: [
    AppComponent,
    HeroListComponent
  ],
  providers: [
    HttpActivityLogger,
    HttpInterceptorProviders,
    HttpInterceptorRegistryService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(registry: HttpInterceptorRegistryService) {
    registry.register();
  }
}




