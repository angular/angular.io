import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';


import { AppComponent }     from './app.component';
import { AboutComponent }   from './about.component';
import { BannerComponent }  from './banner.component';
import { HeroService, UserService } from './model';
import { WelcomeComponent } from './welcome.component';

import { DashboardModule }  from './dashboard/dashboard.module';
import { SharedModule }     from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'about', component: AboutComponent },
      { path: 'about', component: AboutComponent, outlet: 'popup' },
      { path: 'heroes', loadChildren: 'app/hero/hero.module'}
    ]),
    SharedModule
  ],
  providers:    [ HeroService, UserService ],
  declarations: [ AppComponent, AboutComponent, BannerComponent, WelcomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
