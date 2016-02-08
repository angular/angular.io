// #docregion
import {Component, ViewChild} from 'angular2/core';
import {CountdownTimerComponent} from './countdown-timer.component';

@Component({
  selector:'countdown-parent',
  template: `
  <h3>Countdown to Liftoff</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <countdown-timer></countdown-timer>
  `,
  directives: [CountdownTimerComponent]
})
export class CountdownParentComponent {

  @ViewChild(CountdownTimerComponent)
  private _timerComponent:CountdownTimerComponent;

  start(){ this._timerComponent.start(); }
  stop() { this._timerComponent.stop(); }
}