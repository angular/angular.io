import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

// #docregion
@Component({
  selector: 'hero-counter-auto-broken',
  template: `
    Number of heroes: {{ heroCount }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCounterAutoComponent implements OnInit, OnDestroy {
  heroCount = 5;
  private updateIntervalId: any;

  ngOnInit() {
    // Changes made in the interval loop will not be detected!
    this.updateIntervalId = setInterval(() => this.heroCount++, 100);
  }

  ngOnDestroy() {
    clearInterval(this.updateIntervalId);
  }

}
