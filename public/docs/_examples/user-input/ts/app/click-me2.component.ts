// #docregion
import {Component} from 'angular2/core';

@Component({
  selector: 'click-me2',
  template: `
    <button (click)="onClickMe2($event)">No! .. Click me!</button>
    {{clickMessage}}`
})
export class ClickMeComponent2 {
  clickMessage = '';
  clicks = 1;

  onClickMe2(event:any){
    let evtMsg = event ? ' Event target is '+ event.target.tagName  : '';
    this.clickMessage = (`Click #${this.clicks++}. ${evtMsg}`)
  }
}
