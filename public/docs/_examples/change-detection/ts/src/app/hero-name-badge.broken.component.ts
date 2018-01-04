import { Component, Input } from '@angular/core';
import { Hero } from './hero.model';

// #docregion
@Component({
  selector: 'hero-name-badge-broken',
  template: `
    <h4>{{ hero.name }} details</h4>
    <p>Name: {{ getDisplayName() }}</p>
  `
})
export class HeroNameBadgeBrokenComponent {
  @Input() hero: Hero;

  getDisplayName() {
    if (!this.hero.name || this.hero.name.length === 0) {
      // We're setting the name during change detection.
      // This may cause errors in other bindings that refer to the same data!
      this.hero.name = 'Anonymous';
    }
    return this.hero.name;
  }

}
