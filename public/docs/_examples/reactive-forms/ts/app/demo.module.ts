import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { ReactiveFormsModule }  from '@angular/forms';  // <-- #1 import the module
import { DemoComponent }        from './demo.component';
import { components }           from './hero-signup-versions.component';
import { HeroSignUpComponent }  from './hero-signup.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [ DemoComponent, HeroSignUpComponent, ...components ],
  bootstrap: [ DemoComponent ]
})
export class DemoModule { }
