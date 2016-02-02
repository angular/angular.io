// #docregion
import {Component} from 'angular2/core';
import {HeroComponent} from './hero.component';

@Component({
  selector: 'master',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero *ngFor="#hero of heroes"
      [name]="hero"
      [master-name]="master">
    </hero>
  `,
  directives: [HeroComponent]
})
export class MasterComponent {
  heroes: string[] = ['Mr. IQ', 'Magneta', 'Bombasto'];
  master: string = 'Master';
}
// #enddocregion
