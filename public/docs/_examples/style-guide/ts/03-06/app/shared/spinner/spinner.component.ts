import {Component, OnDestroy, OnInit} from 'angular2/core';

import { SpinnerService } from './spinner.service';

@Component({
  selector: 'toh-spinner',
  template: '<div>spinner</div>'
})

export class SpinnerComponent implements OnDestroy, OnInit {
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() { }

  ngOnDestroy() { }
}
