// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>AppModules v.1</h1>
    Hero: <input [(ngModel)]="hero">
  `
})
export class AppComponent {
  hero = 'Magneta';
}

