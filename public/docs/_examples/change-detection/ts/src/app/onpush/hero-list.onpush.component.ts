import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Hero } from '../hero.model';

// #docregion
@Component({
  selector: 'hero-list-onpush',
  template: `
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero.name }}
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent {
  @Input() heroes: Hero[];
}
