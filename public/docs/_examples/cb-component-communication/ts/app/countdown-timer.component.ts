// #docregion
import {Component, EventEmitter, OnInit, Output} from 'angular2/core';

@Component({
  selector:'countdown-timer',
  template: '<p>{{message}}</p>'
})
export class CountdownTimerComponent implements OnInit {

  intervalId: any;
  message:string;
  seconds = 11;

  private _countDown() {
    this.intervalId = setInterval(()=>{
      this.seconds -= 1;
      if (this.seconds == 0) {
        this.message = "Blast off!";
        this.seconds = 11; // reset
      } else {
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }

  ngOnInit() { this.start(); }
  start() { this._countDown(); }
  stop() {
    clearInterval(this.intervalId);
    this.message = `Holding at T-${this.seconds} seconds`;
  }
}