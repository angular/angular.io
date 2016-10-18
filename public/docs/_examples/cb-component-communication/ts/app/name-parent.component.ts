// #docregion
import { Component } from '@angular/core';

import { NameChildComponent } from './name-child.component';

@Component({
  selector: 'name-parent',
  template: `
    <h2>Master controls {{names.length}} names</h2>
    <name-child *ngFor="let name of names"
      [name]="name">
    </name-child>
  `,
  directives: [NameChildComponent]
})
export class NameParentComponent {
  // Displays 'Mr. IQ', '<no name set>', 'Bombasto'
  names = ['Mr. IQ', '   ', '  Bombasto  '];
}
// #enddocregion
