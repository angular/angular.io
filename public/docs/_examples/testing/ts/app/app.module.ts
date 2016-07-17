import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { RouterModule }    from '@angular/router';

import { AppComponent }    from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeroModule }      from './hero/hero.module';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    HeroModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ])
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
