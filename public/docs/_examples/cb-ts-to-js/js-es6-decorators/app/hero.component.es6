// #docplaster
// #docregion metadata
import { Component } from '@angular/core';

@Component({
  selector: 'hero-view',
  template:
    '<h1>Hero: {{getName()}}</h1>'
})
// #docregion appexport
// #docregion class
export class HeroComponent {
  title = 'Hero Detail';
  getName() {return 'Windstorm'; }
}
// #enddocregion class
// #enddocregion appexport
// #enddocregion metadata

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HeroComponent ],
  bootstrap: [ HeroComponent ]
})
export class HeroesModule { }


