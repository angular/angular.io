import {
  Component,
  Input,
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/core';
import { Hero, Heroes } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-list-classes',
  template: `
    <ul>
      <li *ngFor="let hero of heroes"
          @heroState="hero.state"
          (click)="hero.toggleState()">
        {{hero.name}}
      </li>
    </ul>
  `,
  styleUrls: ['hero-list.component.css'],
  /**
   * Define two states, "inactive" and "active", and make it so
   * that the styles for those states are pulled in from the
   * component stylesheet using CSS classes inactive and active.
   * Then define animations for transitioning between the states,
   * one in each direction
   */
  // #docregion animationdef
  animations: [
    trigger('heroState', [
      state('inactive', style('.inactive')),
      state('active', style('.active')),
      transition('inactive => active', animate(100)),
      transition('active => inactive', animate(100))
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListClassesComponent {
  @Input() heroes:Heroes;
}
