import { Component, Input } from '@angular/core';
import { Hero } from './hero.model';

// #docregion
@Component({
  selector: 'hero-name-badge',
  template: `
    <h4>{{ hero.name }} details</h4>
    <p>Name: {{ getDisplayName() }}</p>
  `
})
export class HeroNameBadgeComponent {
  @Input() hero: Hero;

  getDisplayName() {
    if (!this.hero.name || this.hero.name.length === 0) {
      // Here we just return the value we want to see in the view,
      // without mutating anything.
      return 'Anonymous';
    } else {
      return this.hero.name;
    }
  }

}
