// #docregion
import {Component} from 'angular2/core';
import {DrawWithPenService} from './draw-with-pen.service';
import {PenService} from './pen.service';
import {Point} from './point';

@Component({
  selector: 'my-square',
  template: `
    <h3>Square</h3>
    <ul>
      <li *ngFor="#step of drawingSteps">{{step}}</li>
    <ul>
  `,
  providers: [DrawWithPenService, PenService]
})
export class SquareComponent {
  drawingSteps: string[] = [];
  points = [
    new Point(100, 100), new Point(200, 100),
    new Point(200, 200), new Point(100, 200)
  ]
  
  constructor(private _drawService: DrawWithPenService) {
    this.drawingSteps = 
      this._drawService.draw("yellow", this.points);
  }
}
// #enddocregion
