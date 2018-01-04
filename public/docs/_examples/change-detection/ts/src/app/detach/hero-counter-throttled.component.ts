import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

// #docregion
@Component({
  selector: 'hero-counter-throttled',
  template: `
    Number of heroes: <span class="count">{{ heroCount }}</span>
  `
})
export class HeroCounterComponent implements AfterViewInit, OnDestroy {
  heroCount = 5;

  private dataUpdateIntervalId: any;
  private viewUpdateIntervalId: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // Detach the change detector so it never runs unless we do it manually.
    this.changeDetector.detach();
    // Change data a hundred times per second...
    this.dataUpdateIntervalId = setInterval(() => this.heroCount++, 10);
    // ...but detect changes only once per second
    this.viewUpdateIntervalId = setInterval(() => this.changeDetector.detectChanges(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.dataUpdateIntervalId);
    clearInterval(this.viewUpdateIntervalId);
  }

}
