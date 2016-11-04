import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BigHeroDetailComponent, HeroDetailComponent } from './hero-detail.component';
import { MyClickDirective, MyClickDirective2 } from './my-click.directive';
import { MySizerComponent } from './my-sizer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    BigHeroDetailComponent,
    HeroDetailComponent,
    MyClickDirective,
    MyClickDirective2,
    MySizerComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
