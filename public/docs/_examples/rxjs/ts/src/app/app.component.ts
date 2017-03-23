// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { EventAggregatorService } from './event-aggregator.service';
import { ObservablePrinciples }   from './observable-principles';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">RxJS in Angular</h1>

    <a routerLink="/hero/add">Add Hero</a><br>
    <a routerLink="/heroes">Heroes</a><br>
    <a routerLink="/hero/counter">Hero Counter</a><br>

    <router-outlet></router-outlet>

    <loading-component></loading-component>
    <message-log></message-log>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private eventService: EventAggregatorService,
    private principles: ObservablePrinciples) {}

  ngOnInit() {
    this.eventService.add({
      type: 'init',
      message: 'Application Initialized'
    });

    this.principles.callFunctionalExamples();
    this.principles.callPromiseExamples();
  }
}
