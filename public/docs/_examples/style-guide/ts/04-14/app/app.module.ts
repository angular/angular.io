import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroesComponent } from './+heroes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([{ path: '04-14', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
