import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

// #docregion
@Component({
  selector: 'hero-counter-auto',
  template: `
    Number of heroes: {{ heroCount }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCounterAutoComponent implements OnInit, OnDestroy {
  heroCount = 5;
  private updateIntervalId: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.updateIntervalId = setInterval(() => {
      this.heroCount++;
      this.changeDetector.markForCheck();
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.updateIntervalId);
  }

}
