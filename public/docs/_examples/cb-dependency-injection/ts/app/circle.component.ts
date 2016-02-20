// #docregion
import {Component, Input, OnChanges} from 'angular2/core';
import {Point} from './point';
import {CircleApi} from './circle-api.service';

@Component({
  selector: 'circle',
  template: `
    <h2>Cirle</h2>
    <h3>Center: ({{center.x}}, {{center.y}}), radius: {{radius}}</h3>
    <div>
      <code>{{instructions}}</code>
    </div>
  `
})
export class CircleComponent implements OnChanges {
  @Input() center: Point;
  @Input() radius: number;
  instructions = "";
  
  constructor(private circleApi: CircleApi) {}

  ngOnChanges(){
    this.instructions = this.circleApi.drawBlack(this.center, this.radius)
  } 
}
// #enddocregion