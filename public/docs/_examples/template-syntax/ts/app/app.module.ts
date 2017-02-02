import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BigHeroDetailComponent, HeroDetailComponent } from './hero-detail.component';
import { ClickDirective, Click2Directive } from './click.directive';
import { SizerComponent } from './sizer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    BigHeroDetailComponent,
    HeroDetailComponent,
    ClickDirective,
    Click2Directive,
    SizerComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
