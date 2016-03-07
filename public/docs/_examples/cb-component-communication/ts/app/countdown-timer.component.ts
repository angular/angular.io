// #docregion
import {Component, OnInit, OnDestroy} from 'angular2/core';

@Component({
  selector:'countdown-timer',
  template: '<p>{{message}}</p>'
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  clearTimer() {clearInterval(this.intervalId);}

  ngOnInit()    { this.start(); }
  ngOnDestroy() { this.clearTimer(); }

  start() { this._countDown(); }
  stop()  {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private _countDown() {
    this.clearTimer();
    this.intervalId = setInterval(()=>{
      this.seconds -= 1;
      if (this.seconds == 0) {
        this.message = "Blast off!";
      } else {
        if (this.seconds < 0) { this.seconds = 10;} // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}