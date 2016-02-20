import {Injectable} from 'angular2/core';

@Injectable()
export class PenService {
  private _pen: string;
  
  changePen(pen: string) {
    this._pen = pen || 'black'; 
  }
  
  getCurrentPen() {
    return this._pen;
  }
}