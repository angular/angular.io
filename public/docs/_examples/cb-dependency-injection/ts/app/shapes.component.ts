// #docregion
import {Component} from 'angular2/core';
import {TriangleComponent} from './triangle.component';
import {LineComponent} from './line.component';

@Component({
  selector: 'my-shapes',
  template: `
    <h2>Shapes</h2>
    <my-triangle></my-triangle>
    <my-line></my-line>
  `,
  directives: [TriangleComponent, LineComponent]
})
export class ShapesComponent{ }
// #enddocregion
