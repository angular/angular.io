// #docregion
import {Component, Input, OnChanges} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {RectangleDrawService} from './rectangle-draw.service';
import {BorderDrawService} from './border-draw.service';

@Component({
  selector: 'rectangle',
  template: `
    <h4>
      RectangleDraw instance: #{{rectangleSvcIndex}} |
      BorderDraw instance: #{{borderSvcIndex}}
    </h4>
    <div [ngStyle]="style"></div>
  `,
  directives: [NgStyle],
  providers: [BorderDrawService]
})
export class RectangleComponent implements OnChanges {
  @Input() background: string;
  @Input() border: string;
  style: any;
  rectangleSvcIndex: number;
  borderSvcIndex: number;
  
  constructor(
    private _rectangleDrawService: RectangleDrawService,
    private _borderDrawService: BorderDrawService) {
      this.rectangleSvcIndex = _rectangleDrawService.instanceIndex;
      this.borderSvcIndex = _borderDrawService.instanceIndex;
    }
  
  ngOnChanges() {
    var tmpStyle: any = this._rectangleDrawService.draw(this.background);
    tmpStyle.border = this._borderDrawService.draw(this.border, "black", 4);
    this.style = tmpStyle;
  }
}
// #enddocregion