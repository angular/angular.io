// #docregion
import { Component, Output, EventEmitter } from 'angular2/core';

@Component({
  selector: 'toh-hero',
  template: `...`
})
// #docregion example
export class HeroComponent {
  @Output() savedTheDay = new EventEmitter<boolean>();
}
// #enddocregion example


