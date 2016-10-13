import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
class HeroComponent {
  constructor(name) {
    this.name = name;
  }
}

HeroComponent.annotations = [
  new Component({
    selector: 'hero-di-inject',
    template: `<h1>Hero: {{name}}</h1>`
  })
];

HeroComponent.parameters = [
  [new Inject('heroName')]
];
// #enddocregion

export class HeroesDIInjectModule { }

HeroesDIInjectModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    providers: [ { provide: 'heroName', useValue: 'Windstorm' } ],
    declarations: [ HeroComponent ],
    bootstrap: [ HeroComponent ]
  })
];
