import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

// #docregion
@Component({
  selector: 'hero-counter-live',
  template: `
    Number of heroes: <span class="count">{{ heroCount }}</span>
    <button (click)="toggleLive()">Toggle live update</button>
  `
})
export class HeroCounterComponent implements OnInit, OnDestroy {
  heroCount = 5;
  private live = true;
  private updateIntervalId: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // Increment counter ten times per second
    this.updateIntervalId = setInterval(() => this.heroCount++, 100);
  }

  ngOnDestroy() {
    clearInterval(this.updateIntervalId);
  }

  toggleLive() {
    this.live = !this.live;
    if (this.live) {
      this.changeDetector.reattach();
    } else {
      this.changeDetector.detach();
    }
  }
}
