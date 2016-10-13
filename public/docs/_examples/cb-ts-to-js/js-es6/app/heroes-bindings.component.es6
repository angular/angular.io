import {
  Component,
  HostBinding,
  HostListener,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
class HeroesComponent {
  constructor() {
    this.title = 'Tooltip content';
    this.hClass = true;
  }

  clicked() {
    this.active = !this.active;
  }

  doubleClicked(evt) {
    this.active = true;
  }
}
HeroesComponent.annotations = [
  new Component({
    selector: 'heroes-bindings',
    template: `<h1 [class.active]="active">
      Tour of Heroes
    </h1>`,
    host: {
      '[title]': 'title',
      '[class.heading]': 'hClass',
      '(click)': 'clicked()',
      '(dblclick)': 'doubleClicked($event)'
    }
  })
];
// #enddocregion

export class HeroesHostBindingsModule { }

HeroesHostBindingsModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    declarations: [ HeroesComponent ],
    bootstrap: [ HeroesComponent ]
  })
];