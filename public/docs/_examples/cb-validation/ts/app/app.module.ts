// #docregion
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { HeroFormTemplateComponent } from './hero-form-template.component'
import { HeroFormModelComponent } from './hero-form-model.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HeroFormTemplateComponent,
    HeroFormModelComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// #enddocregion
