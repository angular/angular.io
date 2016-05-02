// #docregion
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
