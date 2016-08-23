// #docplaster
// #docregion
// #docregion example
import { Component, OnInit } from '@angular/core';

import {
  CONFIG,
  EntityService,
  ExceptionService,
  SpinnerService,
  ToastService
} from '../shared';

@Component({
  // #enddocregion example
  moduleId: module.id,
  providers: [EntityService, ExceptionService, SpinnerService, ToastService],
  // #docregion example
  selector: 'toh-heroes',
  templateUrl: 'heroes.component.html'
})
export class HeroesComponent implements OnInit {
  // #enddocregion example
  urls = CONFIG.baseUrls;
  // #docregion example
  constructor() { }

  ngOnInit() { }
}
// #enddocregion example

