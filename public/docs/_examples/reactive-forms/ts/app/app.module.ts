// #docplaster
// #docregion
// #docregion app-module
// #docregion reactive-imports
import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import the module
import { AppComponent }          from './app.component';
import { ReactiveFormComponent } from './reactive-form.component';
// #enddocregion reactive-imports

// #docregion add-reactive-forms-module
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule // <-- #2 add to Angular module imports
  ],
  declarations: [
    AppComponent,
// #enddocregion add-reactive-forms-module
    ReactiveFormComponent // <-- psst...while you're in here, declare the ReactiveFormComponent
// #docregion add-reactive-forms-module
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// #enddocregion add-reactive-forms-module
// #enddocregion app-module

// #docregion
