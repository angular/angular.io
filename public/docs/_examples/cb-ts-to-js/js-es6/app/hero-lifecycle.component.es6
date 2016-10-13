// #docplaster
// #docregion
import { Component } from '@angular/core';
// #enddocregion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
class HeroComponent {
  ngOnInit() {
    this.name = 'Windstorm';
  }
}
// #enddocregion

HeroComponent.annotations = [
  new Component({
    selector: 'hero-lifecycle',
    template: `<h1>Hero: {{name}}</h1>`
  })
];

export class HeroesLifecycleModule { }

HeroesLifecycleModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    declarations: [ HeroComponent ],
    bootstrap: [ HeroComponent ]
  })
];