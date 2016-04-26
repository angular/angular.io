// #docregion
import { Component, Input, Output, EventEmitter } from 'angular2/core';

// #docregion example
@Component({
  selector: 'toh-button',
  template: `...`
})
export class ButtonComponent {
  @Output() change = new EventEmitter<any>();
  @Input() label: string;
}
// #enddocregion example
