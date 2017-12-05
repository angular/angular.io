import { Component } from '@angular/core';
import { Superpower } from '../models';

@Component({
  selector: 'my-class-metadata-example',
  template: `
    <h2>Class Metadata Inheritance Example</h2>

    <h3>Base Component</h3>
    <my-list [list]="numbers"></my-list>

    <h3>Child Component</h3>
    <my-superpower-list [list]="superpowers"></my-superpower-list>
  `
})
export class ClassMetadataExampleComponent {
  numbers = [1, 2, 3, 4];
  superpowers: Superpower[] = [
    {title: 'Flight'},
    {title: 'Shield'}
  ];
}
