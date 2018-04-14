import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroAssignmentComponent } from './hero-assignment.component';
import { HeroComponent } from './hero.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, HeroAssignmentComponent, HeroComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
