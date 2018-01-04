// #docregion
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hero-counter-onpush',
  template: `
    Number of heroes:
    <button (click)="decrease()">-</button>
    <span>{{ heroCount }}</span>
    <button (click)="increase()">+</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCounterComponent {
  heroCount = 5;

  increase() { this.heroCount = this.heroCount + 1; }
  decrease() { this.heroCount = Math.max(this.heroCount - 1, 0); }

}
