// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'hero-counter',
  template: `
    Number of heroes:
    <button (click)="decrease()">-</button>
    <span class="count">{{ heroCount }}</span> <!-- This expression always evaluates to the latest value -->
    <button (click)="increase()">+</button>
  `
})
export class HeroCounterComponent {
  heroCount = 5;

  // When we change data, we don't need to do anything to update the view.
  increase() { this.heroCount = this.heroCount + 1; }
  decrease() { this.heroCount = Math.max(this.heroCount - 1, 0); }

}
