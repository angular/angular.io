import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DataService } from './data.service';

// #docregion
class HeroComponent {
  constructor(dataService) {
    this.name = dataService.getHeroName();
  }
}

HeroComponent.annotations = [
  new Component({
    selector: 'hero-di',
    template: `<h1>Hero: {{name}}</h1>`
  })
];

HeroComponent.parameters = [
  [DataService]
];

// #enddocregion

export class HeroesDIModule { }

HeroesDIModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    providers: [ DataService ],
    declarations: [ HeroComponent ],
    bootstrap: [ HeroComponent ]
  })
];
