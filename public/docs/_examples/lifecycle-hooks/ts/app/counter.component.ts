// #docregion
import {
  Component, Input, Output,
  OnChanges, SimpleChange,
} from 'angular2/core';

import {Spy} from './spy.directive';
import {LoggerService}  from './logger.service';

@Component({
  selector: 'my-counter',
  template: `
  <div class="counter">
    Counter = {{counter}}

    <h5>-- Counter Change Log --</h5>
    <div *ngFor="#chg of changeLog" my-spy>{{chg}}</div>
  </div>
  `,
  styles: ['.counter {background: LightYellow; padding: 8px; margin-top: 8px}'],
  directives:[Spy]
})
export class MyCounter implements OnChanges {
  @Input() counter: number;
  changeLog:string[] = [];

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

    // Empty the changeLog whenever counter goes to zero
    // hint: this is a way to respond programmatically to external value changes.
    if (this.counter === 0) {
      this.changeLog.length = 0;
    }

    // A change to `counter` is the only change we care about
    let prop = changes['counter'];
    let cur = prop.currentValue;
    let prev = JSON.stringify(prop.previousValue); // first time is {}; after is integer
    this.changeLog.push(`counter: currentValue = ${cur}, previousValue = ${prev}`);
  }

}

/***************************************/

@Component({
  selector: 'counter-parent',
  template: `
   <div class="parent">
    <h2>Counter Spy</h2>

    <button (click)="updateCounter()">Update counter</button>
    <button (click)="reset()">Reset Counter</button>

    <my-counter [counter]="value"></my-counter>

    <h4>-- Spy Lifecycle Hook Log --</h4>
    <div *ngFor="#msg of spyLog">{{msg}}</div>
   </div>
  `,
  styles: ['.parent {background: gold;}'],
  directives: [MyCounter],
  providers: [LoggerService]
})
export class CounterParentComponent {
  value: number;
  spyLog:string[] = [];

  private _logger:LoggerService;

  constructor(logger:LoggerService){
    this._logger = logger;
    this.spyLog = logger.logs;
    this.reset();
  }

  updateCounter() {
    this.value += 1;
    this._logger.tick();
  }

  reset(){
    this._logger.log('-- reset --');
    this.value=0;
    this._logger.tick();
  }
}

