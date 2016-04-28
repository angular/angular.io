// #docregion
import { Component, Output, EventEmitter } from 'angular2/core';
// #docregion example
/* avoid */

@Component({
  selector: 'toh-hero',
  template: `...`
})
export class HeroComponent {
  @Output() onSavedTheDay = new EventEmitter<boolean>();
}
// #enddocregion example
