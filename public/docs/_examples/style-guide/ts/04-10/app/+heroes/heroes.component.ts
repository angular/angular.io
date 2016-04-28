// #docregion
// #docregion example
import { Component, OnInit } from 'angular2/core';

import {
  CONFIG,
  EntityService,
  ExceptionService,
  FilterTextComponent,
  InitCapsPipe,
  SpinnerService,
  ToastService
} from '../../app/shared';

@Component({
  selector: 'toh-heroes',
  templateUrl: 'app/+heroes/heroes.component.html'
})
export class HeroesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
// #enddocregion example

