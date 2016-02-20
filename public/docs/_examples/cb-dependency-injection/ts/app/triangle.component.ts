// #docregion
import {Component} from 'angular2/core';
import {DrawService} from './draw.service';
import {Point} from './point';

@Component({
  selector: 'my-triangle',
  template: `
    <h3>Triangle</h3>
    <ul>
      <li *ngFor="#step of drawingSteps">{{step}}</li>
    <ul>
  `,
// #docregion providers
  providers: [DrawService]
// #enddocregion providers
})
export class TriangleComponent {
  drawingSteps: string[] = [];
  points = [
    new Point(100, 100), new Point(200, 300), new Point(0, 300)
  ]
  
  constructor(private _drawService: DrawService) {
    this.drawingSteps = _drawService.draw(this.points);
  }
}
// #enddocregion