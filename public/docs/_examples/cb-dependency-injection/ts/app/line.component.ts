// #docregion
import {Component, Optional} from 'angular2/core';
import {DrawService} from './draw.service';
import {Point} from './point';

@Component({
  selector: 'my-line',
  template: `
    <h3>Line (optional DrawService)</h3>
    <ul>
      <li *ngFor="#step of drawingSteps">{{step}}</li>
    <ul>
  `
})
export class LineComponent {
  drawingSteps: string[] = [];
  points = [new Point(100, 100), new Point(200, 100)]
  
  constructor(
    @Optional() private _drawService: DrawService) {
    if (_drawService) {
      this.drawingSteps = _drawService.draw(this.points);
    }
    else
    {
      // Workaround to carry out the task of DrawService
      this.drawingSteps = [
        `Fake shape with ${this.points.length} points`
      ];
    }
  }
}
// #enddocregion