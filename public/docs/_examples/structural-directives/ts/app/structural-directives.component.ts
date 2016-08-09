// #docplaster
// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'structural-directives',
  templateUrl: 'app/structural-directives.component.html',
  styles: ['button { min-width: 100px; }']
})
export class StructuralDirectivesComponent {
  heroes = ['Mr. Nice', 'Narco', 'Bombasto'];
  hero = this.heroes[0];
  condition = true;
  isVisible = true;
  logs: string[] = [];
  status = 'ready';
}
// #enddocregion
