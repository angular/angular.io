// #docregion
import {Injectable} from 'angular2/core';
import {Point} from './point';

@Injectable()
export class CircleApi {
  drawBlack(center: Point, radius: number) {
    return `
      STORE PEN to _oldPen;
      MOVE TO ${center.x}, ${center.y};
      CHANGE PEN to BLACK;
      ARC ${radius} 0 360;
      RESTORE PEN from _oldPen;
    `
  }
}
// #enddocregion