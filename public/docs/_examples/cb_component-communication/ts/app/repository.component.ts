// #docregion
import {Component} from 'angular2/core';
import {VersionComponent} from './version.component';

@Component({
  selector: 'repository',
  template: `
    <h1>Hero source code repository</h1>
    <button (click)="newMinor()">
      New minor version
    </button>
    <button (click)="newMajor()">
      New major version
    </button>
    <version [major]="currentMajor"
      [minor]="currentMinor">
    </version>
  `,
  directives: [VersionComponent]
})
export class RepositoryComponent {
  currentMajor: number = 1;
  currentMinor: number = 23;
  
  newMinor() {
    this.currentMinor++;
  }
  
  newMajor() {
    this.currentMajor++;
    this.currentMinor = 0;
  }
}
// #enddocregion
