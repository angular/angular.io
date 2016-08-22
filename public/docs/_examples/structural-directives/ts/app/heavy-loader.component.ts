// #docregion
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

let nextId = 1;

@Component({
  selector: 'heavy-loader',
  template: '<span>heavy loader #{{id}} on duty!</span>'
})
export class HeavyLoaderComponent implements OnDestroy, OnInit {
  id = nextId++;
  @Input() logs: string[];

  ngOnInit() {
    // Mock todo: get 10,000 rows of data from the server
    this.log(`heavy-loader ${this.id} initialized,
      loading 10,000 rows of data from the server`);
  }

  ngOnDestroy() {
    // Mock todo: clean-up
    this.log(`heavy-loader ${this.id} destroyed, cleaning up`);
  }

  private log(msg: string) {
    this.logs.push(msg);
    this.tick();
  }

  // Triggers the next round of Angular change detection
  // after one turn of the browser event loop
  // ensuring display of msg added in onDestroy
  private tick() { setTimeout(() => { }, 0); }
}
// #enddocregion
