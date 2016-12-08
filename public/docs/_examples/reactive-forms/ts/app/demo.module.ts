import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { ReactiveFormsModule }  from '@angular/forms';  // <-- #1 import the module
import { DemoComponent }        from './demo.component';
import { components }           from './hero-detail-versions.component';
import { HeroDetailComponent }  from './hero-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [ DemoComponent, HeroDetailComponent, ...components ],
  bootstrap: [ DemoComponent ]
})
export class DemoModule { }
