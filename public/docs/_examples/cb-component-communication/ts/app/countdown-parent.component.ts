// #docplaster
// #docregion vc
import {AfterViewInit, ViewChild} from '@angular/core';
// #docregion lv
import {Component}                from '@angular/core';
import {CountdownTimerComponent}  from './countdown-timer.component';

// #enddocregion lv
// #enddocregion vc

//// Local variable, #timer, version
// #docregion lv
@Component({
  selector:'countdown-parent-lv',
  template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <countdown-timer #timer></countdown-timer>
  `,
  directives: [CountdownTimerComponent],
  styleUrls: ['demo.css']
})
export class CountdownLocalVarParentComponent { }
// #enddocregion lv

//// View Child version
// #docregion vc
@Component({
  selector:'countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  <countdown-timer></countdown-timer>
  `,
  directives: [CountdownTimerComponent],
  styleUrls: ['demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent)
  private _timerComponent:CountdownTimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this._timerComponent.seconds, 0)
  }

  start(){ this._timerComponent.start(); }
  stop() { this._timerComponent.stop(); }
}
// #enddocregion vc
