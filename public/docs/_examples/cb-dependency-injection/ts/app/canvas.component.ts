// #docregion
import {Component} from 'angular2/core';
import {RectangleDrawService} from './rectangle-draw.service';
import {RectangleComponent} from './rectangle.component';

@Component({
  selector: 'my-canvas',
  template: `
    <h2>Canvas</h2>
    <rectangle [background]="'red'" [border]="'solid'"></rectangle>
    <rectangle [background]="'cyan'" [border]="'dotted'"></rectangle>
    <rectangle [background]="'yellow'" [border]="'dashed'"></rectangle>
  `,
  directives: [RectangleComponent],
  providers:[RectangleDrawService]
})
export class CanvasComponent{ }
// #enddocregion
