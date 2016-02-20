// #docregion
import {Component, Input, Inject, OnChanges} from 'angular2/core';
import {OpaqueToken} from 'angular2/core';

export let ELLIPSE_RATIO = new OpaqueToken('ellipse.ratio'); 

@Component({
  selector: 'ellipse',
  template: `
    <div class="ellipse"
      [ngStyle]="style">
    </div>
  `,
  styles: [`
    .ellipse {
      background-color: blue;
      border-radius: 50%;
    }
  `]
})
export class EllipseComponent implements OnChanges {
  @Input() size: number;
  style: any;
  
  constructor(@Inject(ELLIPSE_RATIO) private _ratio: number) {}
  
  ngOnChanges() {
    this.style = {
      width: `${this.size}px`,
      height: `${this.size * this._ratio}px`
    }
    console.log(this.style);
  }
}
// #enddocregion