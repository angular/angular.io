// #docregion
import {Component, provide} from 'angular2/core';
import {EllipseComponent, ELLIPSE_RATIO} from './ellipse.component';

@Component({
  selector: 'my-ellipse-canvas',
  template: `
    <h2>Ellipses</h2>
    <ellipse [size]="100"></ellipse>
    <ellipse [size]="150"></ellipse>
  `,
  directives: [EllipseComponent],
  providers: [provide(ELLIPSE_RATIO, {useValue: 0.75})]
})
export class EllipseCanvasComponent {}
// #enddocregion