import { Component, Input } from '@angular/core';

import { Hero } from './hero';
import { HeroDetailsComponent } from './hero-details.component';
import { HeroControlsComponent } from './hero-controls.component';
import { QuestSummaryComponent } from './quest-summary.component';

@Component({
  selector: 'hero-app-main',
  template: `
    <quest-summary></quest-summary>
    <hero-details [hero]=hero [class.active]=hero.active>
      <hero-controls [hero]=hero></hero-controls>
    </hero-details>
  `,
  directives: [HeroDetailsComponent, HeroControlsComponent, QuestSummaryComponent]
})
export class HeroAppMainComponent {
  @Input() hero: Hero;
}
