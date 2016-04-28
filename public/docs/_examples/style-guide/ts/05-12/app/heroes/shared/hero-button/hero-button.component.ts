// #docregion
import { Component, Input, Output, EventEmitter } from 'angular2/core';

// #docregion example
@Component({
  selector: 'toh-hero-button',
  template: `<button>OK</button>`
})
export class HeroButtonComponent {
  @Output() change = new EventEmitter<any>();
  @Input() label: string;
}
// #enddocregion example
