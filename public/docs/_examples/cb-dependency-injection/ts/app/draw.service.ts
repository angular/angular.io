// #docregion
import {Injectable} from 'angular2/core';
import {Point} from './point';

@Injectable()
export class DrawService {
  draw(points: Point[]) {
    let steps: string[] = [];
    for (let i = 0; i < points.length; i++) {
      steps.push(`Point #${i}: (${points[i].x}, ${points[i].y})`)
    }
    return steps;
  }
}
// #enddocregion