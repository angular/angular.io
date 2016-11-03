// #docplaster
// #docregion metadata
import { Component } from '@angular/core';

// #docregion class
// #docregion appexport
export class HeroComponent {
  constructor() {
    this.title = 'Hero Detail';
  }
  getName() {return 'Windstorm'; }
}
// #enddocregion appexport
// #enddocregion class

HeroComponent.annotations = [
  new Component({
    selector: 'hero-view',
    template: '<h1>{{title}}: {{getName()}}</h1>'
  })
];
// #enddocregion metadata

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

export class HeroesModule { }

HeroesModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    declarations: [ HeroComponent ],
    bootstrap: [ HeroComponent ]
  })
];


