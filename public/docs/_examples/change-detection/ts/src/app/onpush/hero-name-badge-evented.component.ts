import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { HeroModel } from './hero-evented.model';

// #docregion
@Component({
  selector: 'hero-name-badge-evented',
  template: `
    <h4>{{ hero.getName() }} details</h4>
    <p>Name: {{ hero.getName() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroNameBadgeComponent implements OnInit, OnDestroy {
  @Input() hero: HeroModel;
  private unsubscribe: () => void;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // Subscribe to changes in the hero model and run the component's change
    // detector every time we get notified.
    this.unsubscribe =
      this.hero.subscribeToChanges(() => this.changeDetector.markForCheck());
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
