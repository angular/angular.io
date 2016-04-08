import {
  Component,
  Input,
  trigger,
  state,
  style,
  keyframes,
  animate,
  transition,
  group
} from '@angular/core';
import { Hero, Heroes } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-list-keyframes',
  template: `
    <ul>
      <li *ngFor="let hero of heroes"
          @flyInOut="'in'">
        {{hero.name}}
      </li>
    </ul>
  `,
  styleUrls: ['hero-list.component.css'],
  /* The element here always has the state "in" when it
   * is present. We animate two transitions: From void
   * to in and from in to void, to achieve an animated
   * enter and leave transition. The actual animations
   * are defined as CSS keyframes in the component
   * stylesheet. They are pulled into the transition
   * configuration using the keyframes() function.
   */
  // #docregion animationdef
  styles: [`
    @keyframes flyIn {
      0%   { opacity: 0; transform: translateX(-100%); }
      30%  { opacity: 1; transform: translateX(15px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes flyOut {
      0%   { opacity: 1; transform: translateX(0); }
      70%  { opacity: 1; transform: translateX(-15px); }
      100% { opacity: 1; transform: translateX(100%); }
    }
  `],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        // Enable when CSS parser integration has been added
        // animate(300, keyframes('flyIn'))
      ]),
      transition('* => void', [
        // Enable when CSS parser integration has been added
        // animate(300, keyframes('flyOut'))
      ])
    ])
  ]
  // #enddocregion animationdef
})
export class HeroListKeyframesComponent {
  @Input() heroes:Heroes;
}
