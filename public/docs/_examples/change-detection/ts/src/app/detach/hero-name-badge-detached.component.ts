import { ChangeDetectorRef, Component, Input, AfterViewInit } from '@angular/core';
import { Hero } from '../hero.model';

// #docregion
@Component({
  selector: 'hero-name-badge-detached',
  template: `
    <h4>{{ hero.name }} details</h4>
    <p>Name: {{ hero.name }}</p>
  `
})
export class HeroNameBadgeComponent implements AfterViewInit {
  @Input() hero: Hero;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.changeDetector.detach();
  }

}
