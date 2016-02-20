// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class BorderDrawService {
  static instances = 0;
  instanceIndex: number;
  
  constructor() {
    this.instanceIndex = BorderDrawService.instances++;
  }
  
  draw(style: string, color: string, width: number) {
    return `${width}px ${style} ${color}`;
  }
}
// #enddocregion