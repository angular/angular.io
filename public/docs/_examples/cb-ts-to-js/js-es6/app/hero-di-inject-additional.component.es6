import {
  Attribute,
  Component,
  Inject,
  Optional,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
class TitleComponent {
  constructor(titlePrefix, title) {
    this.titlePrefix = titlePrefix;
    this.title  = title;
    this.msg = '';
  }

  ok() {
    this.msg = 'OK!';
  }
}

TitleComponent.annotations = [
  new Component({
    selector: 'hero-title',
    template: `
      <h1>{{titlePrefix}} {{title}}</h1>
      <button (click)="ok()">OK</button>
      <p>{{ msg }}</p>
    `
  })
];

TitleComponent.parameters = [
  [new Optional(), new Inject('titlePrefix')],
  [new Attribute('title')]
];
// #enddocregion

class AppComponent {
}
AppComponent.annotations = [
  new Component({
    selector: 'hero-di-inject-additional',
    template: `<hero-title title="Tour of Heroes">
    </hero-title>`
  })
];

export class HeroesDIInjectAdditionalModule { }

HeroesDIInjectAdditionalModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    declarations: [
      AppComponent,
      TitleComponent
    ],
    bootstrap: [ AppComponent ]
  })
];
