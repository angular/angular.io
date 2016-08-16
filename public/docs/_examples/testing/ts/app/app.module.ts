import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';

import { AppComponent }     from './app.component';
import { BannerComponent }  from './banner.component';
import { HeroService, UserService } from './model';
import { WelcomeComponent } from './welcome.component';

import { DashboardModule }  from './dashboard/dashboard.module';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'heroes', loadChildren: 'app/hero/hero.module'}
    ])
  ],
  providers:    [ HeroService, UserService ],
  declarations: [ AppComponent, BannerComponent, WelcomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
