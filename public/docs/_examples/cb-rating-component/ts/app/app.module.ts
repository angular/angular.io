import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroRatingComponent } from './rating.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, HeroRatingComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
