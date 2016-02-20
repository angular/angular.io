// #docregion
import {Component} from 'angular2/core';
import {ThemedDrawService, themedDrawProvider} from './themed-draw.service';

@Component({
  selector: 'themed-rectangle',
  template: `
    <div style="width: 200px; height: 100px;"
      [ngStyle]='style'>
    </div>
  `,
// #docregion providers
  providers: [themedDrawProvider]
// #enddocregion providers
})
export class ThemedRectangleComponent {
  constructor(private _drawService: ThemedDrawService) {}
  
  get style() {
    return {
      'background-color': this._drawService.background
    }
  }
}
// #enddocregion