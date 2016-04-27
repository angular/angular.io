// #docregion
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toh-hero',
  template: `...`
})
// #docregion example
export class HeroComponent {
  @Output() savedTheDay = new EventEmitter<boolean>();
}
// #enddocregion example


