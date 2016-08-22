// #docregion
import { Component, EventEmitter, Input, Output } from '@angular/core';
// #docregion example
/* avoid */

@Component({
  selector: 'toh-hero-button',
  template: `<button>{{label}}</button>`
})
export class HeroButtonComponent {
  @Output('changeEvent') change = new EventEmitter<any>();
  @Input('labelAttribute') label: string;
}
// #enddocregion example
