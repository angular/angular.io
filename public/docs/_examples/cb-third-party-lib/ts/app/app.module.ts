import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }      from './app.component';
import { HeroProfileModule } from 'hero-profile';

@NgModule({
  imports: [HeroProfileModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
