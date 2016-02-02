// #docregion
import {Component} from 'angular2/core';
import {Hero2Component} from './hero2.component';

@Component({
  selector: 'master2',
  template: `
    <h2>Master controls {{heroes.length}} heroes</h2>
    <hero *ngFor="#hero of heroes"
      [name]="hero">
    </hero>
  `,
  directives: [Hero2Component]
})
export class Master2Component {
  heroes: string[] = ['Mr. IQ', '   ', 'Bombasto'];
}
// #enddocregion
