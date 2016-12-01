// #docregion
import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import the module
import { AppComponent }        from './app.component';
import { HeroSignUpComponent } from './hero-signup.component'; // <-- #1 import the component you're making

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule // <-- #2 add to Angular module imports
  ],
  declarations: [
    AppComponent,
    HeroSignUpComponent // <-- #3 declare the HeroSignUpComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
