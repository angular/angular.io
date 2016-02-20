// #docregion
import {Injectable} from 'angular2/core';
import {Point} from './point';
import {PenService} from './pen.service';

@Injectable()
export class DrawWithPenService {
  
  constructor(private _penService: PenService) {
    _penService.changePen('red');
  }
  
  draw(pen: string, points: Point[]) {
    let steps: string[] = [];
    this._penService.changePen(pen);
    steps.push(`Using ${this._penService.getCurrentPen()} pen`)
    for (let i = 0; i < points.length; i++) {
      steps.push(`Point #${i}: (${points[i].x}, ${points[i].y})`)
    }
    return steps;
  }
}
// #docregion
