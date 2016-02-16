// #docregion
import {Component, provide} from 'angular2/core';
import {Point} from './point';
import {CircleApi} from './circle-api.service';
import {CircleComponent} from './circle.component';

@Component({
  selector: 'my-paint',
  template: `
    <h2>Paint Application</h2>
    <circle [center]="{x: 100, y: 75}" [radius]="14"></circle>
  `,
  directives: [CircleComponent],
  providers: [
    // We provide a ready-made object istead of a class
    provide(CircleApi, {useValue: {
      drawBlack: (center: Point, radius: number) =>
        `circle(${center.x}, ${center.y}, ${radius});`
    }})
  ]
})
export class PaintComponent {}
// #enddocregion
