// #docregion
// #docregion example
/* avoid */

import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../shared/config';
import { EntityService } from '../shared/entity.service';
import { ExceptionService } from '../shared/exception.service';
import { FilterTextComponent } from '../shared/filter-text/filter-text.component';
import { InitCapsPipe } from '../shared/init-caps.pipe';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'toh-heroes',
  templateUrl: 'app/+heroes/heroes.component.html'
})
export class HeroesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
// #enddocregion example

