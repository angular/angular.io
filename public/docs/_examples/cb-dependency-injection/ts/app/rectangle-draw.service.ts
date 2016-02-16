import {Injectable} from 'angular2/core';

@Injectable()
export class RectangleDrawService {
  private static instances = 0;
  instanceIndex: number;
  
  constructor() {
    this.instanceIndex = RectangleDrawService.instances++;
  }
  
  draw(color: string) {
    return {
      'background-color': `${color}`,
      width: '200px',
      height: '50px'
    }
  }
}