import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';

import { AppComponent }     from './app.component';
import { BannerComponent }  from './banner.component';
import { UserService }      from './shared/user.service';
import { WelcomeComponent } from './welcome.component';

import { DashboardModule }  from './dashboard/dashboard.module';
import { HeroModule }       from './hero/hero.module';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    HeroModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ])
  ],
  providers:    [ UserService ],
  declarations: [ AppComponent, BannerComponent, WelcomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
