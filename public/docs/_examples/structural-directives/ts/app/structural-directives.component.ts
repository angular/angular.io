// #docplaster
// #docregion
import { Component } from '@angular/core';
import { UnlessDirective }          from './unless.directive';
import { HeavyLoaderComponent }     from './heavy-loader.component';

@Component({
  selector: 'structural-directives',
  templateUrl: 'app/structural-directives.component.html',
  styles: ['button { min-width: 100px; }'],
  directives: [UnlessDirective, HeavyLoaderComponent]
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
